const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
dotenv.config({ path: `./config.env` });

const db = process.env.MONGODB_URI;
const port = process.env.PORT || 3001;
const host = process.env.HOST || "127.0.0.1";
mongoose
  .connect(db)
  .then((con) => console.log("db connected successfully !!!"));

app.listen(port, () => console.log(`server running on :${port}`));
