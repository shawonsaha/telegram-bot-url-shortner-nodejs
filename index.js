const dotenv = require("dotenv").config(); // allows you to separate secrets from your source code

const TelegramBot = require("node-telegram-bot-api");
const token = process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });

var mongoose = require("mongoose"); // schema-based solution to model application data
var url = require("url"); // url validation checker
var sh = require("shorthash"); //short hash string generator

// Database Configuration
//----------------------------------
// Connection to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose Schema
var urlSchema = new mongoose.Schema({
  url: String,
  hash: String,
});

// Mongoose Model
var Url = mongoose.model("Url", urlSchema);

bot.on("message", (msg) => {
  // var Hi = "hi";
  var userInput = msg.text.toString();
  var link = url.parse(userInput);

  if (link.hostname) {
    let short_url = sh.unique(userInput);

    var myData = new Url({ url: userInput, hash: short_url });
    myData.save();

    const short_link = "https://shawon-saha.glitch.me/" + short_url;

    if (true) {
      bot.sendMessage(msg.chat.id, short_link);
    }
  }
});
