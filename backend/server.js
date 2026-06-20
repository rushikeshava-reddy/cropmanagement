const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
 
const jwt=require("jsonwebtoken");

require("dotenv").config();

const User = require("./models/User");
const Crop = require("./models/Crop");
const Enquiry = require("./models/Enquiry");
const app = express();

app.use(cors());
app.use(express.json());

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Cloud Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Failed", error);
    });

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

app.post("/api/register", async (req, res) => {
    try{
      const { fullName, email, password, role } = req.body;

const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
    fullName,
    email,
    password: hashedPassword,
    role,
});

await newUser.save();

res.status(200).json({
    message: "Registration Successful",
});
    }catch (error){
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });
    }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // create token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
});


app.post("/crops", auth, async (req, res) => {
  try {
    const { cropName, cropArea, cropStatus, cropPlace } = req.body;

    const crop = new Crop({
      cropName,
      cropArea,
      cropStatus,
      cropPlace,
      userId: req.user.id, // 🔥 IMPORTANT FIX
    });

    await crop.save();

    res.status(201).json(crop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.get("/crops", auth, async (req, res) => {
  try {
    const crops = await Crop.find({ userId: req.user.id });

    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/crops/:id", auth, async (req, res) => {
  try {
    const { cropName, cropArea, cropStatus, cropPlace } = req.body;

    const crop = await Crop.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!crop) {
      return res.status(404).json({ message: "Crop not found or unauthorized" });
    }

    crop.cropName = cropName;
    crop.cropArea = cropArea;
    crop.cropStatus = cropStatus;
    crop.cropPlace = cropPlace;

    const updatedCrop = await crop.save();

    res.json(updatedCrop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.delete("/crops/:id", auth, async (req, res) => {
  try {
    const crop = await Crop.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!crop) {
      return res.status(404).json({
        message: "Crop not found or unauthorized",
      });
    }

    res.status(200).json({
      message: "Crop deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


app.get("/crops/count", async (req, res) => {
  try {
    const count = await Crop.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===================== ENQUIRY APIs =====================

// Create Enquiry
app.post("/enquiries", async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Enquiries
app.get("/enquiries", async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Single Enquiry
app.get("/enquiries/:id", async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found",
      });
    }

    res.status(200).json(enquiry);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Reply to Enquiry
app.put("/enquiries/:id/reply", async (req, res) => {
  try {
    const { reply } = req.body;

    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found",
      });
    }

    enquiry.reply = reply;
    enquiry.status = "Replied";

    await enquiry.save();

    res.status(200).json({
      success: true,
      message: "Reply submitted successfully",
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete Enquiry
app.delete("/enquiries/:id", async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Total Enquiries Count
app.get("/enquiries/count", async (req, res) => {
  try {
    const count = await Enquiry.countDocuments();

    res.status(200).json({
      count,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


app.get("/enquiries/user/:email", async (req, res) => {
  try {
    const enquiries = await Enquiry.find({
      email: req.params.email,
    }).sort({ createdAt: -1 });

    res.json(enquiries);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// =================== END ENQUIRY APIs ===================

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})




