const express = require('express');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files like index.html
app.use(express.static(path.join(__dirname)));

// Needed so forms can simulate PUT requests
app.use(methodOverride('_method'));

// Handle GET request for profile edit form
app.get('/user/:id/edit', (req, res) => {
  res.send(`
    <form hx-put="/user/1" hx-target="this" hx-swap="outerHTML">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          name="name"
          value="Greg Lim"
        >
      </div>

      <div class="mb-3">
        <label for="bio" class="form-label">Bio</label>
        <textarea
          class="form-control"
          id="bio"
          name="bio"
        >Follower of Christ | Author of Best-selling Amazon Tech Books and Creator of Coding Courses</textarea>
      </div>

      <button type="submit" class="btn btn-primary">
        Save Changes
      </button>

      <button
        type="button"
        class="btn btn-secondary"
        hx-get="/index.html"
      >
        Cancel
      </button>
    </form>
  `);
});

// Handle PUT request for updating profile
app.put('/user/:id', (req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;

  res.send(`
    <div
      class="card"
      style="width: 18rem;"
      hx-target="this"
      hx-swap="outerHTML"
    >
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">
          ${bio}
        </p>
        <button
          class="btn btn-primary"
          hx-get="/user/1/edit"
        >
          Click To Edit
        </button>
      </div>
    </div>
  `);
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});