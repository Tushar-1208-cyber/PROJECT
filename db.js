const mongoose = require('mongoose');

// Replace <your_connection_string> with your actual MongoDB URI
const uri = "mongodb+srv://tusharGupta:<db_password>@cse-2cluster0.t0rpj.mongodb.net/";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
