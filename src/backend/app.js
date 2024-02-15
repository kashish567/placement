const express = require("express");
const { User, Company, JobRole } = require("./mongo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Route to handle adding a company with job roles
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


app.post("/admin/companies", async (req, res) => {
    const { name, description, jobRoles } = req.body;

    try {
        // Create a new company instance
        const newCompany = new Company({
            name,
            description,
            jobRoles // Assign the job roles directly to the company
        });

        // Save the new company to the database
        await newCompany.save();

        res.status(201).json(newCompany);
    } catch (error) {
        console.error("Failed to add company:", error);
        res.status(500).json({ error: "Failed to add company" });
    }
});

// Route to handle adding a job role
app.post("/admin/job-roles", async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        // Create a new job role instance
        const newJobRole = new JobRole({
            title,
            description
        });

        // Save the new job role to the database
        await newJobRole.save();

        res.status(201).json(newJobRole);
    } catch (error) {
        console.error("Failed to add job role:", error);
        res.status(500).json({ error: "Failed to add job role" });
    }
});

// Route to get all companies
app.get("/companies", async (req, res) => {
    try {
        const companies = await Company.find({}, 'name description jobRoles'); // Include 'jobRoles' in the response
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

app.post("/apply", async (req, res) => {
    const { companies } = req.body;
    console.log("Received companies:", companies);

    try {
        // Loop through the selected companies and update their status
        for (const companyName of companies) {
            // Find the company by name and update its status
            await Company.findOneAndUpdate({ name: companyName }, { $set: { applied: true } });
        }

        res.status(200).json({ message: "Applied to selected companies successfully" });
    } catch (error) {
        console.error("Failed to apply to companies:", error);
        res.status(500).json({ error: "Failed to apply to companies" });
    }
});
// Start the server
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
