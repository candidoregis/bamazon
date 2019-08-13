var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "b469modid",
    database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    runBamazon();
  });

function displayProductsList(){

}

function runBamazon() {

    displayProductsList();

    inquirer
      .prompt({
        name: "buyingId",
        type: "input",
        message: "What is the product ID would you like to buy?",
      })
      .then(function(answer) {
        buyingProductPerId(answer);
      });
  }
  