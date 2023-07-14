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
  console.log("GET - requesting user handle: " + req.params.handle); // log the user handle being requested

  const username = req.params.handle; // get the user handle from the request parameters

  const userData = await getUser(username, res); // get the user data from the GitHub API

  if (userData) { // if user data is returned
    res.render("user", { // render the user view
      title: userData.login, // set the page title to the user's login name
      userProfile: { // set the user profile data
        handle: userData.login, // set the user handle
        avatar_url: userData.avatar_url, // set the user's avatar URL
        bio: userData.bio, // set the user's bio
        html_url: userData.html_url, // set the user's GitHub profile URL
        company: userData.company, // set the user's company
        location: userData.location, // set the user's location
        created_at: userData.created_at.split("T")[0], // set the user's creation date
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

async function getUser(userHandle, res) {
  try {
    const { data: user } = await octokit.users.getByUsername({
      username: userHandle,
    });
    return user;
    // .then(({ user }) => {
    //     return user
    // });
  } catch (error) {
    const errorMessage = `Get user request: ${userHandle} - ${error} - ${error.status}`;
    const errorPagePath = path.join(__dirname, "/views/404.pug");
    res.render(errorPagePath, { error: errorMessage });
    console.log(errorMessage);
  }
}

/**
 * Module Exports
 */
module.exports = { getUser };
