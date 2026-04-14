const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const publicDir = path.join(__dirname, 'public');
const indexPath = path.join(publicDir, 'index.html');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve /public assets
app.use(express.static(publicDir));

// Debug route (visit this in browser)
app.get('/debug', (req, res) => {
  res.json({
    __dirname,
    publicDir,
    indexPath,
    indexExists: fs.existsSync(indexPath),
  });
});

// Serve homepage explicitly
app.get('/', (req, res) => {
  res.sendFile(indexPath);
});

// Your HTMX endpoint
app.post('/search', async (req, res) => {
  const searchTerm = req.body.search?.toLowerCase();
  if (!searchTerm) return res.send('');

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

    const results = users.filter((user) => {
      const name = user.name.toLowerCase();
      const email = user.email.toLowerCase();
      return name.includes(searchTerm) || email.includes(searchTerm);
    });

    res.send(
      results
        .map(
          (user) => `
            <tr>
              <td>${user.name}</td>
              <td>${user.email}</td>
            </tr>
          `
        )
        .join('')
    );
  } catch (err) {
    console.error(err);
    res.status(500).send('<tr><td colspan="2">Error fetching users</td></tr>');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});