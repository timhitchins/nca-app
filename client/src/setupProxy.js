//boilerplate code for using proxy
const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    proxy(["/api"], { target: "http://localhost:5000" }) // this should definitely be an .env var
  );
};
