const mongoose = require("mongoose");

//Create database connection
// process.env.MONGODB_URI || process.env.REACT_APP_DBCONNECTION
mongoose
    .connect("mongodb+srv://metabase:Wnuf2Bwue4w7FXIo@cluster0-ag1c7.mongodb.net/checkbookDB?ssl=true&authSource=admin&retryWrites=true&w=majority",
        { useNewUrlParser: true, 
        useUnifiedTopology: true})
    .then(console.log("Connected to mongodb...")
    )
    .catch(err => {
        console.log("Connection error", err.message)
    });

const db = mongoose.connection;

module.exports = db;