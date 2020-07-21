const mongoose = require("mongoose");
const dbConn = require("../../src/config/keys").mongoURI;

//Create database connection
// process.env.MONGODB_URI || process.env.REACT_APP_DBCONNECTION
mongoose
    .connect(process.env.MONGODB_URI || dbConn,
        { useNewUrlParser: true, 
        useUnifiedTopology: true})
    .then(console.log("Connected to mongodb...")
    )
    .catch(err => {
        console.log("Connection error", err.message)
    });

const db = mongoose.connection;

module.exports = db;