import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(join(__dirname, "public")));

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = "cyberninja";

let client;
let db;

async function connectToDatabase() {
  try {
    if (client && db) {
      return { client, db };
    }

    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected to MongoDB successfully");

    db = client.db(DB_NAME);
    return { client, db };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// User routes
app.post("/api/users", async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("users").insertOne({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const user = await db.collection("users").findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Course routes
app.get("/api/courses", async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const courses = await db.collection("courses").find({}).toArray();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

app.post("/api/courses", async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("courses").insertOne({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
});

// Challenge routes
app.get("/api/challenges", async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const challenges = await db.collection("challenges").find({}).toArray();
    res.json(challenges);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({ error: "Failed to fetch challenges" });
  }
});

app.post("/api/challenges", async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection("challenges").insertOne({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating challenge:", error);
    res.status(500).json({ error: "Failed to create challenge" });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "dist", "index.html"));
  });
}

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
