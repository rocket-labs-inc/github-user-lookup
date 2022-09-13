// index.js

/**
 * Required External Modules
 */

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { Octokit } = require("@octokit/rest");


var req = {};
req.headers = { authorization: 'Bearer eyJ1eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImVtYWlsIjoicnNhX2xvcmRAIn0sImlhdCI6MTU4MjIyMTY3NX0.70f6VAIQk2Uzpf3sgH-1JVrrTuwudonm2DKn2ec7Tg8' }


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
  // try
  // {
  //     const username = req.body.username
  //     //...
  //     var userData = await getUser(username)

  //     var user_created_at = userData.created_at

  //     var created_at_dateFormat = user_created_at.split('T')
  //     var dateFormatted = created_at_dateFormat[0]

  //     res.render("user", { title: "Profile", userProfile:
  //     { handle: userData.login, avatar_url: userData.avatar_url, bio: userData.bio, html_url: userData.html_url,
  //         company: userData.company, location: userData.location, created_at: dateFormatted} });
  // }
  // catch(error)
  // {
  //     res.render(path.join(__dirname + '/views/404.pug'), {error: error});
  // }

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

var gh_pat =
  "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";
var sas =
  "?sv=2021-06-08&ss=b&srt=c&sp=ry&se=2024-09-13T01:50:31Z&st=2022-09-12T17:50:31Z&spr=https&sig=uev9uPPOASMmIy1lZH8ANZ3%2F4zal3Wso4Kj8%2Be2Qfi0%3D";

var req = {};
req.headers = {
  authorization:
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImVtYWlsIjoicnNhX2xvcmRAIn0sImlhdCI6MTU4MjIyMTY3NX0.50f6VAIQk2Uzpf3sgH-1JVrrTuwudonm2DKn2ec7Tg8",
};

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
