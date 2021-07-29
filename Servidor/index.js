const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

const app = express();


conectarDB();
app.use(cors());
app.use(express.json({ extends: true }));

const PORT = process.env.PORT || 4000;

app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/routine", require("./routes/routine"));
app.use("/api/exercise", require("./routes/exercise"));

app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});

console.log("desde index");
