// index.js

/**
 * Required External Modules
 */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Octokit } = require("@octokit/rest");

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.post("/user", async (req, res) => {
  res.redirect(303, "/user/" + req.body.username);
});

app.get("/user/:handle", async (req, res) => {
  console.log("GET - requesting user handle: " + req.params.handle);

  const username = req.params.handle;

  const userData = await getUser(username, res);

  if (userData) {
    const userCreatedAt = userData.created_at;

    const createdDateFormat = userCreatedAt.split("T");
    const dateFormatted = createdDateFormat[0];

    res.render("user", {
      title: userData.login,
      userProfile: {
        handle: userData.login,
        avatar_url: userData.avatar_url,
        bio: userData.bio,
        html_url: userData.html_url,
        company: userData.company,
        location: userData.location,
        created_at: dateFormatted,
      },
    });
  }
});

// 404 not found when no match - included at the end of all routes
app.get("*", function (req, res) {
  const errorPath = path.join(__dirname, "/views/404.pug");
  res.render(errorPath, { error: "Page Not Found" });
});

/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

/**
 * Business Logic
 */

const octokit = new Octokit();


