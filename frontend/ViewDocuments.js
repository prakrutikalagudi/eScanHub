// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import Tesseract from "tesseract.js";

// // function ViewDocuments() {
// //   const [documents, setDocuments] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [text, setText] = useState("");
// //   const [formattedData, setFormattedData] = useState({});
// //   const [saving, setSaving] = useState(false);
// //   const [currentDocId, setCurrentDocId] = useState(null); // Track which document was scanned

// //   useEffect(() => {
// //     const fetchDocuments = async () => {
// //       try {
// //         const response = await axios.get("http://localhost:5000/documents");
// //         setDocuments(response.data);
// //       } catch (error) {
// //         alert("Error fetching documents");
// //       }
// //     };

// //     fetchDocuments();
// //   }, []);

// //   const handleDelete = async (id) => {
// //     try {
// //       await axios.delete(`http://localhost:5000/delete-document/${id}`);
// //       alert("Document deleted successfully!");
// //       setDocuments(documents.filter((doc) => doc._id !== id));
// //     } catch (error) {
// //       alert("Error deleting document");
// //     }
// //   };

// //   const handleScan = async (filePath, docId) => {
// //     try {
// //       setLoading(true);
// //       setCurrentDocId(docId); // Store the document ID for saving later
// //       console.log("Scanning document with ID:", docId); // Debug log
      
// //       const response = await axios.get(`http://localhost:5000/${filePath}`, { responseType: "blob" });
// //       const file = new Blob([response.data]);
// //       const result = await Tesseract.recognize(file, "eng");
// //       const raw = result.data.text;
// //       formatText(raw);
// //       setLoading(false);
// //       alert("Scanning completed successfully!");
// //     } catch (error) {
// //       setLoading(false);
// //       alert("Error scanning document");
// //     }
// //   };

// //   const formatText = (raw) => {
// //     const lines = raw
// //       .split("\n")
// //       .map((line) => line.trim())
// //       .filter(Boolean);
// //     const formatted = {};
// //     lines.forEach((line) => {
// //       const [key, ...rest] = line.split(":");
// //       if (rest.length > 0) {
// //         formatted[key.trim()] = rest.join(":").trim();
// //       }
// //     });
// //     setText(raw);
// //     setFormattedData(formatted);
// //   };

// //   const saveToDB = async () => {
// //     if (!currentDocId) {
// //       alert("No document selected. Please scan a document first.");
// //       return;
// //     }

// //     try {
// //       setSaving(true);
// //       console.log("Saving to document ID:", currentDocId); // Debug log
      
// //       await axios.post(`http://localhost:5000/scan-document/${currentDocId}`, {
// //         scannedDetails: formattedData,
// //       });
      
// //       setSaving(false);
// //       alert("Formatted data saved to database successfully!");
// //     } catch (error) {
// //       setSaving(false);
// //       alert("Error saving data to database");
// //       console.error("Save error:", error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h3>Uploaded Documents</h3>
// //       {documents.length === 0 ? (
// //         <p>No documents uploaded yet.</p>
// //       ) : (
// //         documents.map((doc) => (
// //           <div key={doc._id} style={{ marginBottom: "20px" }}>
// //             <h4>{doc.name}</h4>
// //             <p>{doc.description}</p>
// //             <img
// //               src={`http://localhost:5000/${doc.filePath}`}
// //               alt={doc.name}
// //               style={{ maxWidth: "200px", height: "100px", marginBottom: "10px", borderRadius: "0px" }}
// //             />
// //             <button onClick={() => handleDelete(doc._id)} style={{ marginRight: "10px" }}>
// //               Delete
// //             </button>
// //             <button onClick={() => handleScan(doc.filePath, doc._id)}>
// //               Scan
// //             </button>
// //           </div>
// //         ))
// //       )}
// //       {loading && <p>Scanning... please wait</p>}
// //       {text && (
// //         <>
// //           <h3>Extracted Text:</h3>
// //           <pre>{text}</pre>

// //           <h3>Formatted Data:</h3>
// //           {Object.entries(formattedData).map(([key, value]) => (
// //             <div key={key} style={{ marginBottom: "10px" }}>
// //               <label>{key}: </label>
// //               <input
// //                 value={value}
// //                 onChange={(e) => setFormattedData({ ...formattedData, [key]: e.target.value })}
// //               />
// //             </div>
// //           ))}
// //           <button onClick={saveToDB} disabled={saving}>
// //             {saving ? "Saving..." : "Save"}
// //           </button>
// //           {currentDocId && <p>Will save to document ID: {currentDocId}</p>}
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// // export default ViewDocuments;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Tesseract from "tesseract.js";
// import EditScannedData from "./EditScannedData"; // Import the new component

// function ViewDocuments() {
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [text, setText] = useState("");
//   const [formattedData, setFormattedData] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [currentDocId, setCurrentDocId] = useState(null);
//   const [editingDocId, setEditingDocId] = useState(null); // For editing modal

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/documents");
//         setDocuments(response.data);
//       } catch (error) {
//         alert("Error fetching documents");
//       }
//     };

//     fetchDocuments();
//   }, []);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this document?")) {
//       try {
//         await axios.delete(`http://localhost:5000/delete-document/${id}`);
//         alert("Document deleted successfully!");
//         setDocuments(documents.filter((doc) => doc._id !== id));
//       } catch (error) {
//         alert("Error deleting document");
//       }
//     }
//   };

//   const handleScan = async (filePath, docId) => {
//     try {
//       setLoading(true);
//       setCurrentDocId(docId);
//       console.log("Scanning document with ID:", docId);
      
//       const response = await axios.get(`http://localhost:5000/${filePath}`, { responseType: "blob" });
//       const file = new Blob([response.data]);
//       const result = await Tesseract.recognize(file, "eng");
//       const raw = result.data.text;
//       formatText(raw);
//       setLoading(false);
//       alert("Scanning completed successfully!");
//     } catch (error) {
//       setLoading(false);
//       alert("Error scanning document");
//     }
//   };

//   const formatText = (raw) => {
//     const lines = raw
//       .split("\n")
//       .map((line) => line.trim())
//       .filter(Boolean);
//     const formatted = {};
//     lines.forEach((line) => {
//       const [key, ...rest] = line.split(":");
//       if (rest.length > 0) {
//         formatted[key.trim()] = rest.join(":").trim();
//       }
//     });
//     setText(raw);
//     setFormattedData(formatted);
//   };

//      const saveToDB = async () => {
//     if (!currentDocId) {
//       alert("No document selected. Please scan a document first.");
//       return;
//     }

//     try {
//       setSaving(true);
//       console.log("Saving to document ID:", currentDocId); // Debug log
      
//       await axios.post(`http://localhost:5000/scan-document/${currentDocId}`, {
//         scannedDetails: formattedData,
//       });
      
//       setSaving(false);
//       alert("Formatted data saved to database successfully!");
//     } catch (error) {
//       setSaving(false);
//       alert("Error saving data to database");
//       console.error("Save error:", error);
//     }
//   };


//   const handleViewEdit = (docId) => {
//     setEditingDocId(docId);
//   };

//   const handleCloseEdit = () => {
//     setEditingDocId(null);
//     // Refresh documents after editing
//     const fetchDocuments = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/documents");
//         setDocuments(response.data);
//       } catch (error) {
//         console.error("Error refreshing documents");
//       }
//     };
//     fetchDocuments();
//   };

//   return (
//     <div>
//       <h3>Uploaded Documents</h3>
//       {documents.length === 0 ? (
//         <p>No documents uploaded yet.</p>
//       ) : (
//         documents.map((doc) => (
//           <div key={doc._id} style={{ 
//             marginBottom: "20px", 
//             padding: "15px", 
//             border: "1px solid #ddd", 
//             borderRadius: "8px" 
//           }}>
//             <h4>{doc.name}</h4>
//             <p><strong>Type:</strong> {doc.type}</p>
//             <p><strong>Submitted by:</strong> {doc.submittedBy}</p>
//             <p><strong>Description:</strong> {doc.description}</p>
            
//             {/* Document Image */}
//             <img
//               src={`http://localhost:5000/${doc.filePath}`}
//               alt={doc.name}
//               style={{ 
//                 maxWidth: "200px", 
//                 height: "100px", 
//                 marginBottom: "10px", 
//                 borderRadius: "4px",
//                 objectFit: "cover"
//               }}
//             />
            
//             {/* Scanned Details Preview */}
//             {doc.scannedDetails && Object.keys(doc.scannedDetails).length > 0 && (
//               <div style={{ 
//                 marginBottom: "10px", 
//                 padding: "10px", 
//                 backgroundColor: "#f8f9fa", 
//                 borderRadius: "4px" 
//               }}>
//               </div>
//             )}
            
//             {/* Action Buttons */}
//             <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
//               <button 
//                 onClick={() => handleDelete(doc._id)} 
//                 style={{ 
//                   padding: "8px 16px",
//                   backgroundColor: "#dc3545",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer"
//                 }}
//               >
//                 Delete
//               </button>
//               <button 
//                 onClick={() => handleScan(doc.filePath, doc._id)}
//                 style={{ 
//                   padding: "8px 16px",
//                   backgroundColor: "#28a745",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer"
//                 }}
//               >
//                 Scan
//               </button>
//               <button 
//                 onClick={() => handleViewEdit(doc._id)}
//                 style={{ 
//                   padding: "8px 16px",
//                   backgroundColor: "#007bff",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer"
//                 }}
//               >
//                 {doc.scannedDetails && Object.keys(doc.scannedDetails).length > 0 
//                   ? "View/Edit Details" 
//                   : "Add Details"}
//               </button>
//             </div>
//           </div>
//         ))
//       )}
      
//       {loading && <p>Scanning... please wait</p>}
      
//       {text && (
//         <div style={{ 
//           marginTop: "20px", 
//           padding: "20px", 
//           border: "1px solid #ddd", 
//           borderRadius: "8px",
//           backgroundColor: "#f8f9fa"
//         }}>
//           <h3>Formatted Data:</h3>
//           {Object.entries(formattedData).map(([key, value]) => (
//             <div key={key} style={{ marginBottom: "10px" }}>
//               <label style={{ fontWeight: "bold", marginRight: "10px" }}>{key}: </label>
//               <input
//                 value={value}
//                 onChange={(e) => setFormattedData({ ...formattedData, [key]: e.target.value })}
//                 style={{ 
//                   padding: "5px", 
//                   width: "300px", 
//                   border: "1px solid #ccc", 
//                   borderRadius: "4px" 
//                 }}
//               />
//             </div>
//           ))}
//           <button 
//             onClick={saveToDB} 
//             disabled={saving}
//             style={{ 
//               padding: "10px 20px",
//               backgroundColor: saving ? "#ccc" : "#28a745",
//               color: "white",
//               border: "none",
//               borderRadius: "4px",
//               cursor: saving ? "not-allowed" : "pointer"
//             }}
//           >
//             {saving ? "Saving..." : "Save to Database"}
//           </button>
//           {currentDocId && (
//             <p style={{ marginTop: "10px", fontSize: "0.9em", color: "#666" }}>
//               {/* Will save to document ID: {currentDocId} */}
//             </p>
//           )}
//         </div>
//       )}

//       {/* Edit Modal */}
//       {editingDocId && (
//         <EditScannedData 
//           documentId={editingDocId} 
//           onClose={handleCloseEdit} 
//         />
//       )}
//     </div>
//   );
// }

// export default ViewDocuments;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Tesseract from "tesseract.js";
import EditScannedData from "./EditScannedData";
import "./styles/ViewDocuments.css";

function ViewDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [formattedData, setFormattedData] = useState({});
  const [saving, setSaving] = useState(false);
  const [currentDocId, setCurrentDocId] = useState(null);
  const [editingDocId, setEditingDocId] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/documents");
        setDocuments(response.data);
      } catch (error) {
        alert("Error fetching documents");
      }
    };

    fetchDocuments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      try {
        await axios.delete(`http://localhost:5000/delete-document/${id}`);
        alert("Document deleted successfully!");
        setDocuments(documents.filter((doc) => doc._id !== id));
      } catch (error) {
        alert("Error deleting document");
      }
    }
  };

  const handleScan = async (filePath, docId) => {
    try {
      setLoading(true);
      setCurrentDocId(docId);
      console.log("Scanning document with ID:", docId);
      
      const response = await axios.get(`http://localhost:5000/${filePath}`, { responseType: "blob" });
      const file = new Blob([response.data]);
      const result = await Tesseract.recognize(file, "eng");
      const raw = result.data.text;
      formatText(raw);
      setLoading(false);
      alert("Scanning completed successfully!");
    } catch (error) {
      setLoading(false);
      alert("Error scanning document");
    }
  };

  const formatText = (raw) => {
    const lines = raw
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const formatted = {};
    lines.forEach((line) => {
      const [key, ...rest] = line.split(":");
      if (rest.length > 0) {
        formatted[key.trim()] = rest.join(":").trim();
      }
    });
    setText(raw);
    setFormattedData(formatted);
  };

  const saveToDB = async () => {
    if (!currentDocId) {
      alert("No document selected. Please scan a document first.");
      return;
    }

    try {
      setSaving(true);
      console.log("Saving to document ID:", currentDocId);
      
      await axios.post(`http://localhost:5000/scan-document/${currentDocId}`, {
        scannedDetails: formattedData,
      });
      
      setSaving(false);
      alert("Formatted data saved to database successfully!");
    } catch (error) {
      setSaving(false);
      alert("Error saving data to database");
      console.error("Save error:", error);
    }
  };

  const handleViewEdit = (docId) => {
    setEditingDocId(docId);
  };

  const handleCloseEdit = () => {
    setEditingDocId(null);
    // Refresh documents after editing
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/documents");
        setDocuments(response.data);
      } catch (error) {
        console.error("Error refreshing documents");
      }
    };
    fetchDocuments();
  };

  return (
    <div className="view-documents-container">
      <div className="view-documents-header">
        <h3>Uploaded Documents</h3>
      </div>

      {documents.length === 0 ? (
        <div className="no-documents">
          <p>No documents uploaded yet.</p>
        </div>
      ) : (
        <div className="documents-grid">
          {documents.map((doc) => (
            <div key={doc._id} className="document-card">
              <div className="document-header">
                <h4>{doc.name}</h4>
              </div>
              
              <div className="document-meta">
                <p><strong>Type:</strong> {doc.type}</p>
                <p><strong>Submitted by:</strong> {doc.submittedBy}</p>
                <p><strong>Description:</strong> {doc.description}</p>
              </div>
              
              {/* Document Image */}
              <img
                src={`http://localhost:5000/${doc.filePath}`}
                alt={doc.name}
                className="document-image"
              />
              
              {/* Scanned Details Preview */}
              {doc.scannedDetails && Object.keys(doc.scannedDetails).length > 0 && (
                <div className="scanned-details-preview">
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="action-buttons">
                <button 
                  onClick={() => handleDelete(doc._id)} 
                  className="action-button delete-button"
                >
                  Delete
                </button>
                <button 
                  onClick={() => handleScan(doc.filePath, doc._id)}
                  className="action-button scan-button"
                >
                  Scan
                </button>
                <button 
                  onClick={() => handleViewEdit(doc._id)}
                  className="action-button view-edit-button"
                >
                  {doc.scannedDetails && Object.keys(doc.scannedDetails).length > 0 
                    ? "View/Edit Details" 
                    : "Add Details"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {loading && (
        <div className="loading-container">
          <div className="loading-text">
            <div className="loading-spinner"></div>
            Scanning... please wait
          </div>
        </div>
      )}
      
      {text && (
        <div className="formatted-data-section">
          <h3>Formatted Data</h3>
          {Object.entries(formattedData).map(([key, value]) => (
            <div key={key} className="data-field">
              <label>{key}:</label>
              <input
                value={value}
                onChange={(e) => setFormattedData({ ...formattedData, [key]: e.target.value })}
              />
            </div>
          ))}
          <button 
            onClick={saveToDB} 
            disabled={saving}
            className="save-button"
          >
            {saving ? "Saving..." : "Save to Database"}
          </button>
          {currentDocId && (
            <p className="document-id-info">
              {/* Will save to document ID: {currentDocId} */}
            </p>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {editingDocId && (
        <EditScannedData 
          documentId={editingDocId} 
          onClose={handleCloseEdit} 
        />
      )}
    </div>
  );
}

export default ViewDocuments;