const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/combinedDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  empId: String,
  role: String,
  description: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Document Schema
const documentSchema = new mongoose.Schema({
  name: String,
  type: String,
  submittedBy: String,
  description: String,
  filePath: String,
  scannedDetails: Object, // To store formatted text extracted from OCR
});

const Document = mongoose.model("Document", documentSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// User Management APIs

app.post("/login", async (req, res) => {
  const { empId, password } = req.body;
  let user = await User.findOne({ empId });

  if (!user) {
    user = new User({
      empId,
      password: empId,
      name: "",
      mobile: "",
      email: "",
      role: "",
      description: "",
    });
    await user.save();
    return res.send({ success: true, message: "User created successfully!" });
  }

  if (user.password === password) {
    res.send({ success: true, message: "Login successful!" });
  } else {
    res.status(401).send({ success: false, message: "Incorrect password." });
  }
});

// Add user
app.post("/add-user", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false });
  }
});

// Update user
app.put("/update-user/:empId", async (req, res) => {
  try {
    const { empId } = req.params;
    const updates = req.body;
    await User.findOneAndUpdate({ empId }, updates);
    res.send({ success: true });
  } catch (error) {
    res.status(500).send({ success: false });
  }
});

// Document Management APIs

// Add document
app.post("/add-document", upload.single("file"), async (req, res) => {
  try {
    const { name, type, submittedBy, description } = req.body;
    const filePath = req.file.path;

    const newDoc = new Document({ name, type, submittedBy, description, filePath });
    await newDoc.save();
    res.send({ success: true, message: "Document uploaded successfully!" });
  } catch (error) {
    console.error("Error adding document:", error);
    res.status(500).send({ success: false, message: "Error uploading document." });
  }
});

// Get all documents
app.get("/documents", async (req, res) => {
  try {
    const documents = await Document.find();
    res.send(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).send({ success: false, message: "Error fetching documents." });
  }
});
// // Get single document with scanned details
// app.get("/document/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const document = await Document.findById(id);
    
//     if (!document) {
//       return res.status(404).send({ success: false, message: "Document not found!" });
//     }
    
//     res.send({ success: true, document });
//   } catch (error) {
//     console.error("Error fetching document:", error);
//     res.status(500).send({ success: false, message: "Error fetching document." });
//   }
// });

// Delete document
app.delete("/delete-document/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findByIdAndDelete(id);

    if (document) {
      res.send({ success: true, message: "Document deleted successfully!" });
    } else {
      res.status(404).send({ success: false, message: "Document not found!" });
    }
  } catch (error) {
    console.error("Error deleting document:", error);
    res.status(500).send({ success: false, message: "Error deleting document." });
  }
});


app.post("/scan-document/:id", async (req, res) => {
  const { id } = req.params; // Document ID
  const { scannedDetails } = req.body; // Formatted data from frontend

  // Debug logging
  console.log("Received ID:", id);
  console.log("Type of ID:", typeof id);
  console.log("ID value:", JSON.stringify(id));

  try {
    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).send({ success: false, message: "Document not found!" });
    }
    // Save the scanned details in the document
    document.scannedDetails = scannedDetails;
    await document.save();

    res.send({ success: true, message: "Scanned details saved successfully!", document });
  } catch (error) {
    console.error("Error saving scanned details:", error);
    res.status(500).send({ success: false, message: "Error saving scanned details to database." });
  }
});

// Get document with scanned details
app.get("/document/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);
    
    if (!document) {
      return res.status(404).send({ success: false, message: "Document not found!" });
    }
    
    res.send({ success: true, document });
  } catch (error) {
    console.error("Error fetching document:", error);
    res.status(500).send({ success: false, message: "Error fetching document." });
  }
});

// Update scanned details for a document
app.put("/update-scanned-details/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { scannedDetails } = req.body;
    
    const document = await Document.findByIdAndUpdate(
      id, 
      { scannedDetails }, 
      { new: true }
    );
    
    if (!document) {
      return res.status(404).send({ success: false, message: "Document not found!" });
    }
    
    res.send({ success: true, message: "Scanned details updated successfully!", document });
  } catch (error) {
    console.error("Error updating scanned details:", error);
    res.status(500).send({ success: false, message: "Error updating scanned details." });
  }
});
// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).send({ success: false, message: "Internal server error." });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).send({ success: false, message: "Route not found." });
});

// Start the server
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Fixed template literal
  console.log("Available endpoints:");
  console.log("- POST /login");
  console.log("- POST /add-user");
  console.log("- PUT /update-user/:empId");
  console.log("- GET /users");
  console.log("- DELETE /delete-user/:empId");
  console.log("- POST /add-document");
  console.log("- GET /documents");
  console.log("- GET /document/:id");
  console.log("- DELETE /delete-document/:id");
  console.log("- POST /scan-document/:id");
  console.log("- PUT /update-scanned-details/:id");
});