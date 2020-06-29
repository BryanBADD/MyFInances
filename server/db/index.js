const mongoose = require("mongoose");

//Create database connection
// process.env.MONGODB_URI || process.env.REACT_APP_DBCONNECTION
mongoose
    .connect(process.env.MONGODB_URI,
        { useNewUrlParser: true, 
        useUnifiedTopology: true})
    .then(console.log("Connected to mongodb...")
    )
    .catch(err => {
        console.log("Connection error", err.message)
    });

const db = mongoose.connection;

module.exports = db;