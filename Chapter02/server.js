import express from 'express';

const app = express();

// Static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (As sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies as they are sent by API clients
app.use(express.json());

// Handle GET request to fetch users
app.get('/users', async (req, res) => {
    setTimeout(async () => {
        try {
            const limit = Number(req.query.limit) || 10;

            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users?_limit=${limit}`
            );

            if (!response.ok) {
                return res.status(502).send(`<p>Upstream error: ${response.status}</p>`);
            }

            const users = await response.json();

            res.send(`
                <h2>Users</h2>
                <ul class="list-group">
                    ${users
                        .map(user => `<li class="list-group-item">${user.name}</li>`)
                        .join('')}
                </ul>
            `);
        } catch (err) {
            res.status(500).send('<p>Failed to fetch users.</p>');
        }
    }, 2000);
});

app.post('/calculate', (req, res) => {
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);

    if (!Number.isFinite(height) || !Number.isFinite(weight) || height === 0) {
        return res.status(400).send('<p>Please enter valid height and weight.</p>');
    }

    const bmi = weight / (height * height);

    res.send(`
        <p>Height of ${height} & Weight of ${weight} gives you BMI of ${bmi.toFixed(2)}</p>
    `);
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
