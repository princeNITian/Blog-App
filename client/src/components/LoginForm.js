import React, { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./Profile";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");


  const baseUrl = "http://localhost:5000";

  useEffect(() => {
    // Check if blogToken already exists
    const blogToken = localStorage.getItem("blogToken");
    if (blogToken) {
      const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${blogToken}`
        }
      }
      axios
        .post(`${baseUrl}/api/userInfo`, {},config)
        .then((response) => {
        //   console.log(response.data.user);
          setUser(response.data.user);
        })
        .catch((error) => {
          console.log("LoginForm Error: ", error);
        });
    }
  }, []);

  const handleLogin = () => {
    console.log("Logging in with:", email, password);
    axios
      .post(`${baseUrl}/api/login`, { email, password })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("blogToken", response.data.token);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('blogToken');
    setUser("");
  };

  return (
    <div>
      {user !== "" ?
        <>
          <Profile user={user} onLogout={handleLogout} />
        </>
      :
        <>
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        </>
      }
    </div>
  );
};

export default LoginForm;
