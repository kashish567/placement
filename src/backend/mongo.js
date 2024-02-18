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
    description: { type: String },
    jobRoles: [{
        title: { type: String, required: true },
        description: { type: String }
    }],
    applied: { type: Boolean, default: false } // Field to track if the company has been applied
});

const applicationSchema = new Schema({
    companyId: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
    userEmail: { type: String, required: true }
});

const Application = mongoose.model("Application", applicationSchema);


// Create models
const User = mongoose.model("User", userSchema);
const Company = mongoose.model("Company", companySchema);

module.exports = { User, Company , Application};
