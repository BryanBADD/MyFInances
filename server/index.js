const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const accountRouter = require("./routes/account-routes");
const transactionRouter = require("./routes/transaction-routes")
const path = require("path");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

//Handle database connection interruptions
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//Incorporate routers
app.use("/api", accountRouter);
app.use("/api", transactionRouter);

// app.use(express.static("public"));
// app.get("/", (req,res) => {
//     res.send("Hello World");
// })
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

//Listen for port and confirm it is running
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
