import React, { useEffect, useState } from "react";
import axios from "axios";

function DocumentList() {
  const [documents, setDocuments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    const res = await axios.get("http://localhost:5000/api/documents");
    setDocuments(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/documents/${id}`);
    fetchDocuments();
  };

  const handleEdit = (doc) => {
    setEditingId(doc._id);
    setEditData(doc.data);
  };

  const handleSave = async (id) => {
    await axios.put(`http://localhost:5000/api/documents/${id}`, {
      data: editData,
    });
    setEditingId(null);
    fetchDocuments();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Scanned Documents</h2>
      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        documents.map((doc) => (
          <div key={doc._id} style={{ border: "1px solid #ccc", marginBottom: "15px", padding: "10px" }}>
            <p><strong>Type:</strong> {doc.type}</p>
            <img src={`http://localhost:5000/${doc.imagePath}`} alt="doc" style={{ maxWidth: "200px" }} />
            <br />
            {editingId === doc._id ? (
              <>
                {Object.entries(editData).map(([key, value]) => (
                  <div key={key}>
                    <label>{key}: </label>
                    <input
                      value={value}
                      onChange={(e) => setEditData({ ...editData, [key]: e.target.value })}
                    />
                  </div>
                ))}
                <button onClick={() => handleSave(doc._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <ul>
                  {Object.entries(doc.data).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                  ))}
                </ul>
                <button onClick={() => handleEdit(doc)}>Edit</button>
                <button onClick={() => handleDelete(doc._id)}>Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default DocumentList;
