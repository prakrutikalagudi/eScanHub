// import React, { useState } from "react";
// import AddDocument from "./AddDocument";
// import ViewDocuments from "./ViewDocuments";
// import ScanDocument from "./OCRUploader";
// import OCRUploader from "./OCRUploader";
// import "./styles/DocumentProfile.css";

// function DocumentProfile() {
//   const [view, setView] = useState("");

//   return (
//     <div className="document-profile">
//       <h2>Document Profile</h2>
//       <button onClick={() => setView("add")}>Add Document</button>
//       <button onClick={() => setView("view")}>View Documents</button>
//       {/* <button onClick={() => setView("scan")}>Scan Document</button> */}

//       {view === "add" && <AddDocument />}
//       {view === "view" && <ViewDocuments />}
//       {view === "scan" && <OCRUploader/>}
//     </div>
//   );
// }

// export default DocumentProfile;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddDocument from "./AddDocument";
import ViewDocuments from "./ViewDocuments";
import ScanDocument from "./OCRUploader";
import OCRUploader from "./OCRUploader";
import "./styles/DocumentProfile.css";

function DocumentProfile() {
  const [view, setView] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Goes back to the previous page
    // Or use navigate("/home") if you want to go to a specific route
  };

  return (
    <div className="document-profile">
      <div className="header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h2>Document Profile</h2>
      </div>
      
      <div className="action-buttons">
        <button onClick={() => setView("add")}>Add Document</button>
        <button onClick={() => setView("view")}>View Documents</button>
        {/* <button onClick={() => setView("scan")}>Scan Document</button> */}
      </div>

      <div className="content">
        {view === "add" && <AddDocument />}
        {view === "view" && <ViewDocuments />}
        {view === "scan" && <OCRUploader/>}
      </div>
    </div>
  );
}

export default DocumentProfile;