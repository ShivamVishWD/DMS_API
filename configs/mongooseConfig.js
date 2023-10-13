const mongoose = require('mongoose')
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

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