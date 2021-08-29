const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const mongoClient = require("mongoose");

// Set up connect mongodb by mongoose
mongoClient
  .connect(`mongodb://127.0.0.1/nodejsapistarter`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connect success");
  })
  .catch((error) => {
    console.log(`❎ Connect failed : ${error}`);
  });

const app = express();

// Import
const users = require("./routes/user");

// Middlewares
app.use(logger("dev"));
app.use(bodyParser.json());

// Routes
app.use("/users", users);

// Routes
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Server is OK!",
  });
});

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  // response to client
  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

// Start the server
const port = app.get("port") || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
