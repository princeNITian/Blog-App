import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const baseUrl = "http://localhost:5000";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    dateOfBirth: Date,
  });

  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perfom form validation
    // const newErrors = {};

    // if (!formData.name) {
    //   newErrors.name = "Name is required";
    // }

    // if (!formData.email) {
    //   newErrors.email = "Email is required";
    // }

    // if (!formData.phone) {
    //   newErrors.phone = "Phone is required";
    // }

    // if (!formData.password) {
    //   newErrors.password = "Password is required";
    // }

    // if (!formData.dateOfBirth) {
    //   newErrors.dateOfBirth = "Date of Birth is required";
    // }

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   return;
    // }

    // Perform registration logic here (e.g., send data to the server)
    console.log("Registering with:", formData);
    axios
      .post(`${baseUrl}/api/register`, formData)
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.log("Register Error: ", error.response.data.message);
        setErrors(error.response.data.message);
      });
  };

  return (
    <div>
      <h2>Register</h2>
      {errors === "" ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {/* {errors.name && <div className="invalid-feedback">{errors.name}</div>} */}
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {/* {errors.email && (<div className="invalid-feedback">{errors.email}</div>)} */}
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {/* {errors.phone && (<div className="invalid-feedback">{errors.phone}</div>)} */}
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {/* {errors.password && (<div className="invalid-feedback">{errors.password}</div>)} */}
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input
              type="date"
              className={`form-control ${
                errors.dateOfBirth ? "is-invalid" : ""
              }`}
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            {/* {errors.dateOfBirth && (<div className="invalid-feedback">{errors.dateOfBirth}</div>)} */}
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            Register
          </button>
        </form>
      ) : (
        <p className="text-danger">{errors}</p>
      )}
    </div>
  );
};

export default RegisterForm;
