import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import BlogCard from "./components/BlogCard";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<BlogCard />}/>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<h1>Route does not exist</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
