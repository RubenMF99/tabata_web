const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

const app = express();


conectarDB();
app.use(cors());
app.use(express.json({ extends: true }));

const port = process.env.PORT || 4000;

app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/routine", require("./routes/routine"));
app.use("/api/exercise", require("./routes/exercise"));
app.use("/api/recover", require("./routes/recover"));

app.listen(port,'0.0.0.0', () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});

console.log("desde index");
