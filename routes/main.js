const fetch = require("node-fetch");
const secret = require("../config/secret");
const routes = require("express").Router();

// GET request to '/'
routes.get("/", (req, res, next) => {
  if (process.env.NODE_ENV === "test") {
    res.send("hello!!!");
  } else {
    res.render("home.ejs");
  }
});

// Post request
routes.post("/result", async (req, res, next) => {
  let baseUrl = `http://www.omdbapi.com/?t=${req.body.movieName}&apikey=${secret.API_KEY}`;
  let responseObj;
  try {
    let responseData = await fetch(baseUrl);
    responseObj = await responseData.json();
  } catch (error) {
    // console.log(error);
    responseObj = { Response: "False", Error: "Error while fetching data." };
  }
  if (process.env.NODE_ENV === "test") {
    res.send(responseObj);
  } else {
    res.render("result.ejs", {
      responseObj: responseObj
    });
  }
});
// export default routes;
module.exports = routes;
