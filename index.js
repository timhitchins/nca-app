// es6 modules
import express from "express";
// using common js to avoid deprecation warning
// see https://github.com/expressjs/morgan/issues/190
const morgan = require("morgan");
import helmet from "helmet";
import cors from "cors";
import mountRoutes from "./routes";

// rest app
const app = express();
//cors
app.use(cors());

//general security
app.use(helmet());
app.disable("x-powered-by");

//logging
app.use(morgan("combined"));

//mount
mountRoutes(app);

//production boilerplate
if (process.env.NODE_ENV === "production") {
  //make sure express serves up the corret assests
  //like main.js
  app.use(express.static("client/build"));

  //serve up index.html
  //this is the catch all code
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// app.get("/", (req, res) => {
//   res.json({ bye: "there" });
// });

//heroku dynamic port binding
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
