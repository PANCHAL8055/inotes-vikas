import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import app from "./app.js";
import sequelize from "./db/db.js";

sequelize.sync()
  .then(() => {
    console.log('*********** Database connected Successfully ***********');
    app.listen(process.env.PORT || 8002, () => {
      console.log("App Listening On Port", process.env.PORT);
      console.log(
        "App Address: http://localhost:" + (process.env.PORT || 8002)
      );
    });})
  .catch(err => console.log('Error: ' + err));