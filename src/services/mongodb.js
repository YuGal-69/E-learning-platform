import { MongoClient } from "mongodb";

// MongoDB connection string - you'll need to replace this with your actual connection string
const MONGODB_URI =
  import.meta.env.VITE_MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = "cyberninja";

let client;
let db;

export const connectToDatabase = async () => {
  try {
    if (client && db) {
      console.log("Using existing database connection");
      return { client, db };
    }

    console.log("Connecting to MongoDB...");
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected to MongoDB successfully");

    db = client.db(DB_NAME);
    return { client, db };
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export const getDatabase = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectToDatabase first.");
  }
  return db;
};

export const closeDatabase = async () => {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log("Database connection closed");
  }
};

// Collection helpers
export const getCollection = (collectionName) => {
  const db = getDatabase();
  return db.collection(collectionName);
};

// User operations
export const userOperations = {
  async createUser(userData) {
    const users = getCollection("users");
    const result = await users.insertOne({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result;
  },

  async getUserById(userId) {
    const users = getCollection("users");
    return await users.findOne({ _id: userId });
  },

  async updateUser(userId, updates) {
    const users = getCollection("users");
    const result = await users.updateOne(
      { _id: userId },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      }
    );
    return result;
  },

  async deleteUser(userId) {
    const users = getCollection("users");
    return await users.deleteOne({ _id: userId });
  },
};

// Course operations
export const courseOperations = {
  async createCourse(courseData) {
    const courses = getCollection("courses");
    const result = await courses.insertOne({
      ...courseData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result;
  },

  async getCourseById(courseId) {
    const courses = getCollection("courses");
    return await courses.findOne({ _id: courseId });
  },

  async updateCourse(courseId, updates) {
    const courses = getCollection("courses");
    const result = await courses.updateOne(
      { _id: courseId },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      }
    );
    return result;
  },

  async deleteCourse(courseId) {
    const courses = getCollection("courses");
    return await courses.deleteOne({ _id: courseId });
  },

  async getAllCourses() {
    const courses = getCollection("courses");
    return await courses.find({}).toArray();
  },
};

// Challenge operations
export const challengeOperations = {
  async createChallenge(challengeData) {
    const challenges = getCollection("challenges");
    const result = await challenges.insertOne({
      ...challengeData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result;
  },

  async getChallengeById(challengeId) {
    const challenges = getCollection("challenges");
    return await challenges.findOne({ _id: challengeId });
  },

  async updateChallenge(challengeId, updates) {
    const challenges = getCollection("challenges");
    const result = await challenges.updateOne(
      { _id: challengeId },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      }
    );
    return result;
  },

  async deleteChallenge(challengeId) {
    const challenges = getCollection("challenges");
    return await challenges.deleteOne({ _id: challengeId });
  },

  async getAllChallenges() {
    const challenges = getCollection("challenges");
    return await challenges.find({}).toArray();
  },
};

export default {
  connectToDatabase,
  getDatabase,
  closeDatabase,
  userOperations,
  courseOperations,
  challengeOperations,
};
