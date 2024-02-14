// mongo.js
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
connectDB();

const Schema = mongoose.Schema;

// Define user schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Define company schema
const companySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String }
});

// Define job role schema
const jobRoleSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    company: { type: Schema.Types.ObjectId, ref: 'Company' } // Reference to the Company model
});

// Create models
const User = mongoose.model("User", userSchema);
const Company = mongoose.model("Company", companySchema);
const JobRole = mongoose.model("JobRole", jobRoleSchema);

module.exports = { User, Company, JobRole };
