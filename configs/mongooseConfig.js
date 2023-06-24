const mongoose = require('mongoose')
const uri = "mongodb+srv://root:iIUe54edG43NjrEV@cluster0.3gnla.mongodb.net/dmsAPI?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true
});

const mongooseConn = mongoose.connection;
console.log(`Mongoose Connection Ready State : ${mongoose.connection.readyState}`);
mongooseConn.on("error", console.error.bind(console, "connection error: "));
mongooseConn.once("open", function () {
  console.log("Mongo DB Connected successfully");
});

module.exports = mongooseConn;