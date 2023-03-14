const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1/NoSQL_Social_Network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;