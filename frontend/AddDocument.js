// import React, { useState } from "react";
// import axios from "axios";

// function AddDocument() {
//   const [formData, setFormData] = useState({
//     name: "",
//     type: "",
//     submittedBy: "",
//     description: "",
//   });
//   const [file, setFile] = useState(null);

//   const handleSubmit = async () => {
//     const data = new FormData();
//     data.append("file", file);
//     data.append("name", formData.name);
//     data.append("type", formData.type);
//     data.append("submittedBy", formData.submittedBy);
//     data.append("description", formData.description);

//     try {
//       const response = await axios.post("http://localhost:5000/add-document", data);
//       alert(response.data.message);
//     } catch (error) {
//       alert("Error uploading document");
//     }
//   };

//   return (
//     <div>
//       <h3>Add Document</h3>
//       <input
//         placeholder="Name"
//         value={formData.name}
//         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//       /><br/>
//       <input
//         placeholder="Type"
//         value={formData.type}
//         onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//       /><br/>
//       <input
//         placeholder="Submitted By"
//         value={formData.submittedBy}
//         onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
//       /><br/>
//       <textarea
//         placeholder="Description"
//         value={formData.description}
//         onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//       /><br/>
//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }

// export default AddDocument;


import React, { useState } from "react";
import axios from "axios";
import "./styles/AddDocument.css";

function AddDocument() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    submittedBy: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("submittedBy", formData.submittedBy);
    data.append("description", formData.description);

    try {
      const response = await axios.post("http://localhost:5000/add-document", data);
      alert(response.data.message);
      
      // Reset form after successful submission
      setFormData({
        name: "",
        type: "",
        submittedBy: "",
        description: "",
      });
      setFile(null);
      document.querySelector('input[type="file"]').value = '';
    } catch (error) {
      alert("Error uploading document");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="add-document-container">
      <div className="form-header">
        <h3>Add New Document</h3>
        <p>Fill in the details below to upload your document</p>
      </div>

      <form className="add-document-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Document Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter document name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Document Type</label>
          <select
            id="type"
            value={formData.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
            required
          >
            <option value="">Select document type</option>
            <option value="Invoice">Invoice</option>
            <option value="Marksheets ">Marksheets </option>
            <option value="Resumes"> Resumes</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="submittedBy">Submitted By</label>
          <input
            id="submittedBy"
            type="text"
            placeholder="Enter your name"
            value={formData.submittedBy}
            onChange={(e) => handleInputChange("submittedBy", e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter document description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows="4"
          />
        </div>

        <div className="form-group file-upload-group">
          <label htmlFor="file">Choose File</label>
          <div className="file-upload-wrapper">
            <input
              id="file"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif"
              required
            />
            <div className="file-upload-display">
              {file ? (
                <span className="file-selected"> {file.name}</span>
              ) : (
                <span className="file-placeholder">Click to select a file</span>
              )}
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Uploading...
            </>
          ) : (
            <>
               Submit Document
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default AddDocument;
