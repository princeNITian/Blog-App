import React from "react";

const Profile = ({ user, onLogout }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Profile</h5>
        <p className="card-text">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="card-text">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="card-text">
          <strong>Date of Birth:</strong> {user.dateOfBirth}
        </p>
        <p className="card-text">
          <strong>Phone:</strong> {user.phone}
        </p>
        <button className="btn btn-danger" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
