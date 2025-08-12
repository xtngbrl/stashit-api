const express = require('express');
const fileRoutes = require('./routes/file.routes');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(express.json());
app.use('/api/v1/files', fileRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;
