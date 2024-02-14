// app.js
const express = require("express");
const { User, Company, JobRole } = require("./mongo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", cors(), (req, res) => {});

app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const check = await User.findOne({ email: email });

        if (check) {
            console.log(email);
            res.json("exist");
        } else {
            res.json("notexist");
        }
    } catch (e) {
        res.json("fail");
    }
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const data = {
        email: email,
        password: password
    };

    try {
        const check = await User.findOne({ email: email });

        if (check) {
            res.json("exist");
        } else {
            res.json("notexist");
            await User.insertMany([data]);
        }
    } catch (e) {
        res.json("fail");
    }
});

// Route to handle adding a company
app.post("/admin/companies", async (req, res) => {
    const { name, description } = req.body;
    console.log(name);

    // Assuming company ID is generated automatically
    const companyId = 101;

    const newCompany = {
        id: 101,
        name: name,
        description: description
    };

    await Company.insertMany([newCompany]);
    res.status(201).json(newCompany);
});

// Route to handle adding a job role
app.post("/admin/job-roles",async (req, res) => {
    try {
        const { title, description,  } = req.body;
        if (!title ) {
            return res.status(400).json({ error: "Title and companyId are required" });
        }

        // Create a new job role instance
        const newJobRole = new JobRole({
            title,
            description,
          
        });

        // Save the new job role to the database
        await newJobRole.save();

        res.status(201).json(newJobRole);
    } catch (error) {
        console.error("Failed to add job role:", error);
        res.status(500).json({ error: "Failed to add job role" });
    }
});


// app.js

// Route to get all companies
app.get("/companies", async (req, res) => {
    try {
        const companies = await Company.find({}, 'name description'); // Ensure 'description' is included
        res.json(companies);
    } catch (error) {
        console.error("Failed to fetch companies:", error);
        res.status(500).json({ error: "Failed to fetch companies" });
    }
});

// Route to get all job roles
app.get("/job-roles", async (req, res) => {
    try {
        const jobRoles = await JobRole.find({}, 'title description');
        res.json(jobRoles);
    } catch (error) {
        console.error("Failed to fetch job roles:", error);
        res.status(500).json({ error: "Failed to fetch job roles" });
    }
});

// Start the server
app.listen(8000, () => {
    console.log("port connected");
});
