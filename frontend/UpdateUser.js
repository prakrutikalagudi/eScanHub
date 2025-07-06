// import React, { useState } from "react";
// import axios from "axios";
// import './styles/UpdateUser.css';

// function UpdateUser() {
//   const [empId, setEmpId] = useState("");
//   const [updateDetails, setUpdateDetails] = useState({ password: "", role: "", description: "" });

//   const handleUpdateUser = async () => {
//     try {
//       await axios.put(`http://localhost:5000/update-user/${empId}`, updateDetails);
//       alert("User updated successfully!");
//     } catch (error) {
//       alert("Error updating user.");
//     }
//   };

//   return (
//     <div>
//       <h3>Update User</h3>
//       <input placeholder="Employee ID" value={empId} onChange={(e) => setEmpId(e.target.value)} />
//       {Object.keys(updateDetails).map((key) => (
//         <input
//           key={key}
//           placeholder={key}
//           value={updateDetails[key]}
//           onChange={(e) => setUpdateDetails({ ...updateDetails, [key]: e.target.value })}
//         />
//       ))}
//       <button onClick={handleUpdateUser}>Submit</button>
//     </div>
//   );
// }

// export default UpdateUser;


import React, { useState } from "react";
import axios from "axios";
import './styles/UpdateUser.css';

function UpdateUser() {
  const [empId, setEmpId] = useState("");
  const [updateDetails, setUpdateDetails] = useState({ password: "", role: "", description: "" });
  const [empIdError, setEmpIdError] = useState("");

  const validateEmpId = (value) => {
    if (!value.trim()) {
      setEmpIdError("Employee ID is required");
      return false;
    }
    setEmpIdError("");
    return true;
  };

  const handleEmpIdChange = (e) => {
    const value = e.target.value;
    setEmpId(value);
    validateEmpId(value);
  };

  const handleUpdateUser = async () => {
    // Validate Employee ID before submitting
    if (!validateEmpId(empId)) {
      alert("Please enter a valid Employee ID");
      return;
    }

    // Check if at least one field is being updated
    const hasUpdates = Object.values(updateDetails).some(value => value.trim() !== "");
    if (!hasUpdates) {
      alert("Please fill in at least one field to update");
      return;
    }

    try {
      // Only send non-empty fields
      const fieldsToUpdate = Object.fromEntries(
        Object.entries(updateDetails).filter(([key, value]) => value.trim() !== "")
      );
      
      await axios.put(`http://localhost:5000/update-user/${empId}`, fieldsToUpdate);
      alert("User updated successfully!");
      
      // Reset update fields after successful update
      setUpdateDetails({ password: "", role: "", description: "" });
    } catch (error) {
      alert("Error updating user.");
    }
  };

  const isSubmitDisabled = !empId.trim() || empIdError;

  return (
    <div className="update-user-container">
      <h3>Update User</h3>
      
      {/* <div className="info-note">
        Enter the Employee ID of the user you want to update
      </div> */}

      <div className="employee-id-section">
        <label className="section-label required-field">Employee Identification</label>
        <input 
          className={`employee-id-input ${empIdError ? 'invalid' : ''}`}
          placeholder="Employee ID" 
          value={empId} 
          onChange={handleEmpIdChange}
          required
        />
        {empIdError && <div className="error-message">{empIdError}</div>}
      </div>

      <div className="update-details-section">
        <label className="section-label">Update Information</label>
        
        <div className="update-fields">
          {Object.keys(updateDetails).map((key) => (
            <input
              key={key}
              className={key === 'password' ? 'password-input' : ''}
              placeholder={key === 'password' ? 'New Password' : key}
              type={key === 'password' ? 'password' : 'text'}
              value={updateDetails[key]}
              onChange={(e) => setUpdateDetails({ ...updateDetails, [key]: e.target.value })}
            />
          ))}
        </div>
      </div>

      <button 
        className="submit-btn" 
        onClick={handleUpdateUser}
        disabled={isSubmitDisabled}
        title={isSubmitDisabled ? "Employee ID is required" : "Update user information"}
      >
        Update User
      </button>
    </div>
  );
}

export default UpdateUser;