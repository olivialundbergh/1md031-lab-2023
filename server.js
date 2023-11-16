// Inspired by https://gist.github.com/icebob/0dda386fceb8e14b91d84d057fac676f
"use strict";

// Create express app

// konfigurerar servern. Node vill ha minimal serverarkitekturen
const express = require("express"); //skapar en enkel express server.
const app = express();
var http = require("http").Server(app);
var path = require("path");

// Generate webpack config with CLI service, bry inte om följande kod, gör så att den automatiskt laddar om sidan
if (process.env.NODE_ENV !== "production") {
  const webpackConfig = require("@vue/cli-service/webpack.config.js");

  // Configure webpack as middleware
  const webpack = require("webpack");

  webpackConfig.entry.app.unshift("webpack-hot-middleware/client");
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  //console.log(webpackConfig);
  const compiler = webpack(webpackConfig);
  const devMiddleware = require("webpack-dev-middleware"); // eslint-disable-line
  app.use(
    devMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      headers: { "Access-Control-Allow-Origin": "*" },
      stats: { colors: true },
    })
  ); //till hit

  const hotMiddleware = require("webpack-hot-middleware"); // eslint-disable-line
  app.use(
    hotMiddleware(compiler, {
      log: console.log,
    })
  );
} else {
  app.use(express.static(path.join(__dirname, "dist/")));
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "dist/index.html"));
  });
}

const io = require("socket.io")(http, { cookie: false });

// Store data in an object to keep the global namespace clean and
// prepare for multiple instances of data if necessary
function Data() {
  this.orders = {};
}

/*
  Adds an order to to the queue
*/
Data.prototype.addOrder = function (order) {
  //kör prototype för då blir det en del av dataobjektet, egentligen onödigt men sparar några millisekunder i värsta fallet
  //Store the order in an "associative array" with orderId as key
  this.orders[order.orderId] = order; //lägger in ordern med en nyckel som är "orderId"
};

Data.prototype.getAllOrders = function () {
  return this.orders;
};

let data = new Data();

io.on("connection", function (socket) {
  //när någon connectar

  // Send list of orders when a client connects
  socket.emit("currentQueue", { orders: data.getAllOrders() });

  // When a connected client emits an "addOrder" message
  socket.on("addOrder", function (order) {
    //när vi kör addOrder körs en funktion, tar in (order) just nu {order id....}, den kör en lokal funktion data.addOrder(order)
    data.addOrder(order);
    // send updated info to all connected clients, note the use of io instead of socket
    io.emit("currentQueue", { orders: data.getAllOrders() });
  }); //broadcast; när en person skickar in svara vi till alla, så alla dispatchers får meddelandet; currentQueue

  // When a connected client emits an "clearQueue" message
  socket.on("clearQueue", function () {
    data = new Data();
    // send updated info to all connected clients, note the use of io instead of socket
    io.emit("currentQueue", { orders: data.getAllOrders() });
  });
});

const PORT = process.env.PORT || 8080;
http.listen(PORT, function () {
  console.log("Developer server running on http://localhost:" + PORT);
});
