const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);

describe("Testing routes", () => {
  console.log(
    "If their is not network connection then 'Error while fetching data.' will be logged out.\n"
  );
  describe("/GET movie-wiki-page", () => {
    it("should return response object", done => {
      chai
        .request(app)
        .get("/moviewiki")
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/Post movie-search-query", () => {
    it("should return movie-search response object", done => {
      let moviequery = { movieName: "Venom" };

      chai
        .request(app)
        .post("/moviewiki/result")
        .send(moviequery)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          let respNature;
          chai.expect(res.body.Response).to.satisfy(function(str) {
            respNature = str === "True" ? true : false;
            return str === "True" || str === "False";
          });
          if (!respNature) {
            chai.expect(res.body.Error).to.satisfy(str => {
              return str === "Error while fetching data.";
            });
            console.log(res.body.Error);
          } else {
            console.log("Title : " + res.body.Title);
          }

          res.text.should.be.a("string");
          done();
        });
    });
    it("should return response object containing error message - sometihng went wrong", done => {
      let moviequery1 = { movieName: "" };

      chai
        .request(app)
        .post("/moviewiki/result")
        .send(moviequery1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("Response").eql("False");

          chai.expect(res.body.Error).to.satisfy(function(str) {
            return (
              str === "Something went wrong." ||
              str === "Error while fetching data."
            );
          });
          console.log(res.body.Error);
          done();
        });
    });
  });

  it("should return response object containing error message - movie not found", done => {
    let moviequery2 = { movieName: "sfgdgdg" };

    chai
      .request(app)
      .post("/moviewiki/result")
      .send(moviequery2)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("Response").eql("False");

        chai.expect(res.body.Error).to.satisfy(function(str) {
          return (
            str === "Movie not found!" || str === "Error while fetching data."
          );
        });
        console.log(res.body.Error);
        done();
      });
  });
});

//  console.log(Object.keys(res.text).length);
// let movieObj = {
//     Title: "The Avengers",
//     Year: "2012",
//     Rated: "PG-13",
//     Released: "04 May 2012",
//     Runtime: "143 min",
//     Genre: "Action, Adventure, Sci-Fi",
//     Director: "Joss Whedon",
//     Writer:
//         "Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)",
//     Actors: "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth",
//     Plot:
//         "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
//     Language: "English, Russian, Hindi",
//     Country: "USA",
//     Awards: "Nominated for 1 Oscar. Another 38 wins & 79 nominations.",
//     Poster:
//         "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
//     Ratings: [
//         { Source: "Internet Movie Database", Value: "8.0/10" },
//         { Source: "Rotten Tomatoes", Value: "92%" },
//         { Source: "Metacritic", Value: "69/100" }
//     ],
//     Metascore: "69",
//     imdbRating: "8.0",
//     imdbVotes: "1,204,899",
//     imdbID: "tt0848228",
//     Type: "movie",
//     DVD: "25 Sep 2012",
//     BoxOffice: "$623,279,547",
//     Production: "Walt Disney Pictures",
//     Website: "N/A",
//     Response: "True"
// };
