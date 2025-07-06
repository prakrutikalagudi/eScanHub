import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import './styles/UserProfile.css';
import arrow from "./img/arrow.png";

function UserProfile() {
  const [view, setView] = useState("");
  const navigate = useNavigate();

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const getViewTitle = () => {
    switch(view) {
      case "add": return "Add New User";
      case "update": return "Update User Information";
      default: return "Select an Action";
    }
  };

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="back-button-container">
          <button 
            className="back-button"
            onClick={() => navigate("/home")}
            title="Go back to home"
          >
          back
          </button>
        </div>
        
        <h2>User Profile</h2>
      </div>

      <div className="nav-buttons-container">
        <button 
          className={`up-btn add-user ${view === "add" ? "active" : ""}`}
          onClick={() => handleViewChange("add")}
        >
          <span>Add User</span>
        </button>
        
        <button 
          className={`up-btn update-user ${view === "update" ? "active" : ""}`}
          onClick={() => handleViewChange("update")}
        >
          <span>Update User</span>
        </button>
      </div>

      {view && (
        <div className="breadcrumb">
          User Profile → <span className="current-view">{getViewTitle()}</span>
        </div>
      )}

      <div className="content-area">
        {view === "add" && <AddUser />}
        {view === "update" && <UpdateUser />}
        {!view && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: '#7f8c8d',
            fontSize: '1.2rem'
          }}>
            Welcome to User Management. Please select an action above to get started.
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;