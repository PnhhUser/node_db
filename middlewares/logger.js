import "colors";

const colorMethod = {
  GET: "green",
  POST: "yellow",
  PUT: "blue",
  DELETE: "red",
};

function Logger(req, res, next) {
  console.log(
    `logger: ${req.method} ${req.protocol}://${req.get("host")}${
      req.originalUrl
    }`[colorMethod[req.method]]
  );

  next();
}

export default Logger;
