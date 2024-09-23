const db = require('../db');

// POST: Upload Resume Details
exports.uploadResumeDetails = (req, res) => {
    const { name, currentJobTitle, currentJobDescription, currentJobCompany } = req.body;

    if (!name || !currentJobTitle || !currentJobDescription || !currentJobCompany) {
        return res.status(400).send('Bad Request: Missing fields');
    }

    const sql = 'INSERT INTO resumes (name, currentJobTitle, currentJobDescription, currentJobCompany) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, currentJobTitle, currentJobDescription, currentJobCompany], (err, result) => {
        if (err) {
            return res.status(500).send('Database Error');
        }
        res.status(200).send({ resumeId: result.insertId });
    });
};

// GET: Retrieve resume by ID
exports.getResumeById = (req, res) => {
    const resumeId = req.params.id;

    const sql = 'SELECT * FROM resumes WHERE id = ?';
    db.query(sql, [resumeId], (err, results) => {
        if (err) {
            return res.status(500).send('Database Error');
        }
        if (results.length === 0) {
            return res.status(404).send('Resume not found');
        }
        res.status(200).json(results[0]);
    });
};

// GET: Retrieve resumes by name
exports.getResumeByName = (req, res) => {
    const fullName = req.params.name.split('+');

    if (fullName.length !== 2) {
        return res.status(400).send('Bad Request: Name must contain both first and last name');
    }

    const firstName = fullName[0];
    const lastName = fullName[1];

    const sql = 'SELECT * FROM resumes WHERE name LIKE ? OR name LIKE ?';
    db.query(sql, [`${firstName}%`, `%${lastName}`], (err, results) => {
        if (err) {
            return res.status(500).send('Database Error');
        }
        if (results.length === 0) {
            return res.status(404).send('No matching resumes found');
        }
        res.status(200).json(results);
    });
};
