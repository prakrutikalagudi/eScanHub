import React, { useState } from "react";
import Tesseract from "tesseract.js";
import axios from "axios";

function OCRUploader() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [formattedData, setFormattedData] = useState({});
  const [type, setType] = useState("marksheet");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      performOCR(file);
    }
  };

  const performOCR = async (file) => {
    setLoading(true);
    const result = await Tesseract.recognize(file, "eng");
    const raw = result.data.text;
    setText(raw);
    formatText(raw);
    setLoading(false);
  };

  const formatText = (raw) => {
    const lines = raw.split("\n").map((line) => line.trim()).filter(Boolean);
    const formatted = {};
    lines.forEach((line) => {
      const [key, ...rest] = line.split(":");
      if (rest.length > 0) {
        formatted[key.trim()] = rest.join(":").trim();
      }
    });
    setFormattedData(formatted);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("type", type);
    formData.append("data", JSON.stringify(formattedData));

    await axios.post("http://localhost:5000/api/documents", formData);
    alert("Document saved!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload and Scan Document</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <br /><br />
      <label>Type: </label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="marksheet">Marksheet</option>
        <option value="invoice">Invoice</option>
        <option value="resume">Resume</option>
        <option value="other">Other</option>
      </select>

      {loading && <p>Scanning... please wait</p>}

      {text && (
        <>
          <h3>Extracted Text:</h3>
          <pre>{text}</pre>

          <h3>Formatted Data:</h3>
          {Object.entries(formattedData).map(([key, value]) => (
            <div key={key}>
              <label>{key}: </label>
              <input
                value={value}
                onChange={(e) => setFormattedData({ ...formattedData, [key]: e.target.value })}
              />
            </div>
          ))}
          <button onClick={handleSubmit}>Save to DB</button>
        </>
      )}
    </div>
  );
}

export default OCRUploader;