const express = require('express');
const app = express();

// middleware to read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle POST request for email validation
app.post('/email', (req, res) => {
    const submittedEmail = req.body.email;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //checks whether a string looks like a valid email address.

    // If email is NOT valid
    if (!emailRegex.test(submittedEmail)) {
        return res.send(`
            <div class="mb-3" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    hx-post="/email"
                    value="${submittedEmail || ''}"
                />
                <div class="alert alert-danger mt-2" role="alert">
                    Please enter a valid email address
                </div>
            </div>
        `);
    }

    // Valid email
    return res.send(`
        <div class="mb-3" hx-target="this" hx-swap="outerHTML">
            <label class="form-label">Email address</label>
            <input
                type="email"
                class="form-control is-valid"
                name="email"
                hx-post="/email"
                value="${submittedEmail}"
            />
            <div class="valid-feedback">
                Looks good!
            </div>
        </div>
    `);
});

// start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});