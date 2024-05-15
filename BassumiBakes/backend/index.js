const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const formRoute = require("./routes/form");
const cors = require('cors');

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

    app.use(cors({
        origin: '*',
        allowedHeaders: '*'
    }));
    
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/forms", formRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Backend server is running! http://localhost:"+PORT);
});
