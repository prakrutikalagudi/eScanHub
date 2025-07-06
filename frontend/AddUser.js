import React, { useState } from "react";
import axios from "axios";
import './styles/AddUser.css';

function AddUser() {
  const [form, setForm] = useState({ 
    name: "", 
    mobile: "", 
    email: "", 
    empId: "", 
    role: "", 
    description: "" 
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field labels for better UX
  const fieldLabels = {
    name: "Full Name",
    mobile: "Mobile Number",
    email: "Email Address",
    empId: "Employee ID",
    role: "Role",
    description: "Description"
  };

  // Validate individual field
  const validateField = (key, value) => {
    if (!value.trim()) {
      return `${fieldLabels[key]} is required`;
    }
    
    // Additional validation for specific fields
    if (key === 'email' && value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }
    
    if (key === 'mobile' && value.trim()) {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(value.replace(/\s/g, ''))) {
        return 'Please enter a valid 10-digit mobile number';
      }
    }
    
    return '';
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle input changes with real-time validation
  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
    
    // Clear error for this field if it becomes valid
    if (errors[key]) {
      const error = validateField(key, value);
      if (!error) {
        setErrors({ ...errors, [key]: '' });
      }
    }
  };

  // Handle blur event for validation
  const handleBlur = (key) => {
    const error = validateField(key, form[key]);
    setErrors({ ...errors, [key]: error });
  };

  const handleAddUser = async () => {
    // Validate form before submission
    if (!validateForm()) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Set default password as empId
      const newUser = { ...form, password: form.empId };
      await axios.post("http://localhost:5000/add-user", newUser);
      alert("User added successfully!");
      
      // Reset form after successful submission
      setForm({ 
        name: "", 
        mobile: "", 
        email: "", 
        empId: "", 
        role: "", 
        description: "" 
      });
      setErrors({});
    } catch (error) {
      alert("Error adding user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid for submit button state
  const isFormValid = Object.keys(form).every(key => form[key].trim() !== '') && 
                     Object.keys(errors).every(key => !errors[key]);

  return (
    <div className="add-user-container">
      <h3>Add User</h3>
      <div className="form-container">
        {Object.keys(form).map((key) => (
          <div key={key} className="input-group">
            <input
              className={errors[key] ? 'input-error' : ''}
              placeholder={fieldLabels[key]}
              value={form[key]}
              onChange={(e) => handleInputChange(key, e.target.value)}
              onBlur={() => handleBlur(key)}
              required
              type={key === 'email' ? 'email' : key === 'mobile' ? 'tel' : 'text'}
            />
            {errors[key] && <span className="error-message">{errors[key]}</span>}
          </div>
        ))}
        <button 
          className={`submit-btn ${!isFormValid || isSubmitting ? 'disabled' : ''}`}
          onClick={handleAddUser}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? 'Adding User...' : 'Add User'}
        </button>
      </div>
    </div>
  );
}

export default AddUser;