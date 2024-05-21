const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const connectDB = require('./config/connection');
const userRoute = require('./routes/user');
const walletRoute = require("./routes/wallet");
const referralRoute = require("./routes/referral");
const notFoundError = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/user', userRoute);
app.use('/api/wallet', walletRoute);
app.use('/api/referrals', referralRoute);

app.use(notFoundError);
app.use(errorHandler);

const port = process.env.PORT;

const start = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server started running on ${port}`)
    });
}

start()
