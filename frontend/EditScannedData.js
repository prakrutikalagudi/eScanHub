import React, { useState, useEffect } from "react";
import axios from "axios";

function EditScannedData({ documentId, onClose }) {
  const [document, setDocument] = useState(null);
  const [scannedDetails, setScannedDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    fetchDocument();
  }, [documentId]);

  const fetchDocument = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/document/${documentId}`);
      if (response.data.success) {
        setDocument(response.data.document);
        setScannedDetails(response.data.document.scannedDetails || {});
      }
    } catch (error) {
      alert("Error fetching document details");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key, value) => {
    setScannedDetails(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDeleteField = (key) => {
    const updated = { ...scannedDetails };
    delete updated[key];
    setScannedDetails(updated);
  };

  const handleAddField = () => {
    if (newKey.trim() && newValue.trim()) {
      setScannedDetails(prev => ({
        ...prev,
        [newKey.trim()]: newValue.trim()
      }));
      setNewKey("");
      setNewValue("");
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await axios.put(`http://localhost:5000/update-scanned-details/${documentId}`, {
        scannedDetails
      });
      
      if (response.data.success) {
        alert("Scanned details updated successfully!");
      }
    } catch (error) {
      alert("Error updating scanned details");
      console.error("Save error:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Loading document details...</div>;
  }

  if (!document) {
    return <div>Document not found</div>;
  }

  return (
    <div style={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%", 
      height: "100%", 
      backgroundColor: "rgba(0,0,0,0.5)", 
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div style={{ 
        backgroundColor: "white", 
        padding: "20px", 
        borderRadius: "8px", 
        width: "80%", 
        maxWidth: "800px",
        maxHeight: "80%",
        overflow: "auto"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3>Edit Scanned Data - {document.name}</h3>
          <button onClick={onClose} style={{ padding: "5px 10px" }}>×</button>
        </div>

        {/* Document Image */}
        <div style={{ marginBottom: "20px" }}>
          <img
            src={`http://localhost:5000/${document.filePath}`}
            alt={document.name}
            style={{ maxWidth: "300px", height: "auto", borderRadius: "4px" }}
          />
        </div>

        {/* Existing Fields */}
        <div style={{ marginBottom: "20px" }}>
          <h4>Scanned Details:</h4>
          {Object.keys(scannedDetails).length === 0 ? (
            <p>No scanned details available. Add some fields below.</p>
          ) : (
            Object.entries(scannedDetails).map(([key, value]) => (
              <div key={key} style={{ 
                display: "flex", 
                alignItems: "center", 
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}>
                <label style={{ minWidth: "150px", fontWeight: "bold" }}>{key}:</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  style={{ 
                    flex: 1, 
                    padding: "8px", 
                    marginLeft: "10px",
                    marginRight: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "4px"
                  }}
                />
                <button 
                  onClick={() => handleDeleteField(key)}
                  style={{ 
                    padding: "8px 12px", 
                    backgroundColor: "#ff6b6b", 
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {/* Add New Field */}
        <div style={{ 
          marginBottom: "20px", 
          padding: "15px", 
          backgroundColor: "#f8f9fa", 
          borderRadius: "4px" 
        }}>
          <h4>Add New Field:</h4>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Field name"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              style={{ 
                padding: "8px", 
                border: "1px solid #ccc", 
                borderRadius: "4px" 
              }}
            />
            <input
              type="text"
              placeholder="Field value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              style={{ 
                padding: "8px", 
                border: "1px solid #ccc", 
                borderRadius: "4px",
                flex: 1
              }}
            />
            <button 
              onClick={handleAddField}
              style={{ 
                padding: "8px 16px", 
                backgroundColor: "#28a745", 
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Add Field
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button 
            onClick={onClose}
            style={{ 
              padding: "10px 20px", 
              backgroundColor: "#6c757d", 
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            style={{ 
              padding: "10px 20px", 
              backgroundColor: saving ? "#ccc" : "#007bff", 
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: saving ? "not-allowed" : "pointer"
            }}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditScannedData;