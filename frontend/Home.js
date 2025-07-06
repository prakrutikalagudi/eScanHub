// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./styles/Home.css";

// function Home() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate("/");
//   };

//   return (
//     <div>
//       <nav className="home-nav">
//         <Link to="/home">Home</Link>
//         <Link to="/profile">User Profile</Link>
//         <Link to="/documents">Document Profile</Link>
//       </nav>
//       <h2 className="home-heading">Welcome to the Home Page</h2>
//       <button className="home-logout-btn" onClick={handleLogout}>
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Home;


import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/Home.css";

function Home() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Add any logout logic here (clear tokens, etc.)
    navigate("/");
  };

  return (
    <div className="home-container">
      {/* Floating particles background */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Navigation */}
      <nav className="home-nav">
        <Link to="/home">Home</Link>
        <Link to="/profile">User Profile</Link>
        <Link to="/documents">Document Profile</Link>
      </nav>

      {/* Main content */}
      <div className="home-content">
        <h2 className="home-heading">Welcome to Your Dashboard</h2>
        
        <p className="home-subtitle">
          Manage your profile and documents efficiently with our comprehensive platform. 
          Choose from the navigation above to get started.
        </p>

        {/* Optional: Feature cards */}
        <div className="feature-cards">
          <div className="feature-card">
            <h3>User Management</h3>
            <p>Add, update, and manage user profiles with ease. Control access and permissions for your team members.</p>
          </div>
          
          <div className="feature-card">
            <h3>Document Control</h3>
            <p>Organize and manage your documents securely. Keep track of important files and collaborate effectively.</p>
          </div>
          
          <div className="feature-card">
            <h3>Secure Access</h3>
            <p>Your data is protected with all security measures.</p>
          </div>
        </div>

        <button className="home-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;