require('dotenv').config(); // 1. Daroure kermel yeqra el .env file
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors"); // 2. Afdal tkhalliya lal communication ma3 React

const app = express();
const port = process.env.PORT || 5000;

// View engine setup (eza baddak testa3mel HBS lal errors)
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// DB Configuration
const db = process.env.MONGO_URI; 

mongoose
  .connect(db)
  .then(() => console.log("✅ MongoDB Connected via Process Env..."))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cors()); // 3. Unleash CORS kermel el frontend

// Routes
app.use("/", require("./routes/index"));
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/orders", require("./routes/api/orders"));

// Production Setup
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(path.join(__dirname, "frontend", "build")));

  app.get("*", (req, res) => {
    // 4. Sal7et el path hone la ykoun compatible ma3 kel el servers
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));

module.exports = app;