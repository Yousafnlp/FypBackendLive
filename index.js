import express, { request, response } from "express";
import dotenv from 'dotenv'
import colors from 'colors'
import dbConnection from "./database/dbConnection.js";
import users from "./models/User.js";
import cors from "cors";
import router from "./routers/userRouter.js";


// db configuration
dbConnection();
// storing express in an app
const app = express();

// dot env  cinfiguration
dotenv.config();
// converting express into json formet
app.use(express.json());

// error ka solutution ----
app.use(cors());



// ROUTER CONFIGURATION
app.use(router);
// app.use("/api/v1/auth",router);


// calling port
const port = process.env.PORT || 6001;

app.listen(port, () => {
    console.log(`app is starting on ${port} port`.bgBlue);
})

