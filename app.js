const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;


app.use(bodyParser.json());

const resumeRoutes = require('./routes/resumeRoutes');

app.use('/api', resumeRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
