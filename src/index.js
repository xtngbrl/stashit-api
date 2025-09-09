require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.get('/', function (req, res) {
  const htmlResponse = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Stashit Backend Server</title>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
            <style>
                body {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: 'Poppins', sans-serif;
                background: linear-gradient(135deg, #0d0d0d, #0f1b33);
                color: #eaeaea;
                text-align: center;
                }
                h1 {
                font-size: 3rem;
                color: #4CAF50;
                margin-bottom: 15px;
                }
                p {
                font-size: 1.2rem;
                margin: 8px 0;
                color: #cfcfcf;
                }
                .links {
                margin-top: 20px;
                }
                .links a {
                color: #4CAF50;
                text-decoration: none;
                font-weight: 600;
                margin: 0 10px;
                transition: color 0.3s ease;
                }
                .links a:hover {
                color: #81c784;
                }
                footer {
                position: absolute;
                bottom: 15px;
                font-size: 0.9rem;
                color: #888;
                }
                footer a{
                color: #4CAF50;
                text-decoration: none;
                font-weight: 600;
                transition: color 0.3s ease;
                }
                footer a:hover {
                color: #81c784;
                }
            </style>
            </head>
            <body>
            <h1>🚀 Server is Running</h1>
            <p>Welcome to the backend of <strong>Stash-it</strong>.</p>
            <p>All systems operational and ready.</p>

            <div class="links">
                <a href="https://github.com/xtngbrl/stashit-api" target="_blank">GitHub</a>
                <a href="/docs" target="_blank">API Docs</a>
                <a href="mailto:christian1401.cgb@gmail.com">Contact</a>
            </div>

            <footer>
                <p>&copy; 2025 xtngbrl • Powered by <a href="https://nodejs.org" target="_blank">Node.js</a></p>
            </footer>
            </body>
            </html>
        `;
  res.send(htmlResponse);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
