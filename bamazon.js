require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
const { table } = require("table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.pwdBD,
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
});

function logo() {
    console.log(
        "▀█████████▄xxxxx▄████████xxx▄▄▄▄███▄▄▄▄xxxxxx▄████████xx▄███████▄xxx▄██████▄xx███▄▄▄▄xxx\n" +
        "xx███xxxx███xxx███xxxx███x▄██▀▀▀███▀▀▀██▄xxx███xxxx███x██▀xxxxx▄██x███xxxx███x███▀▀▀██▄x\n" +
        "xx███xxxx███xxx███xxxx███x███xxx███xxx███xxx███xxxx███xxxxxxx▄███▀x███xxxx███x███xxx███x\n" +
        "x▄███▄▄▄██▀xxxx███xxxx███x███xxx███xxx███xxx███xxxx███xx▀█▀▄███▀▄▄x███xxxx███x███xxx███x\n" +
        "▀▀███▀▀▀██▄xx▀███████████x███xxx███xxx███x▀███████████xxx▄███▀xxx▀x███xxxx███x███xxx███x\n" +
        "xx███xxxx██▄xxx███xxxx███x███xxx███xxx███xxx███xxxx███x▄███▀xxxxxxx███xxxx███x███xxx███x\n" +
        "xx███xxxx███xxx███xxxx███x███xxx███xxx███xxx███xxxx███x███▄xxxxx▄█x███xxxx███x███xxx███x\n" +
        "▄█████████▀xxxx███xxxx█▀xxx▀█xxx███xxx█▀xxxx███xxxx█▀xxx▀████████▀xx▀██████▀xxx▀█xxx█▀xx\n");
}

function displayProductsList() {
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var output = [["Item ID", "Product", "Department", "Price", "Quantity"]];
        for (var i = 0; i < res.length; i++) {
            var data = [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity];
            output.push(data);
        }
        console.log("\n" + table(output) + "\n");
        console.log("Welcome to Bamazon! These are the Week's Deals");
        runBamazon();
    });
}

function runBamazon() {
    inquirer.prompt([
        {
            name: 'itemId',
            type: 'input',
            message: 'Please, enter the product ID you want to buy, or enter 0 (zero) to leave Bamazon.',
            validate: function (value) {
                if ((isNaN(value) === false) && (value != 0)) {
                    return true;
                } else if (value==0) {
                    console.log("\nThank you for your visit and welcome back anytime.");
                    connection.end();
                    process.exit();
                }
                return false;
            },
        },
        {
            name: 'itemQuantity',
            type: 'input',
            message: 'How many units do you want to buy? ',
            validate: function (value) {
                if ((isNaN(value) === false) && (value != 0)) {
                    return true;
                }
                return false;
            },
        },
    ])
        .then(function (buyItemAnswer) {
            var query = 'SELECT product_name, price, stock_quantity FROM products where item_id = ?';
            connection.query(query, [buyItemAnswer.itemId], function (err, res) {
                if (err) throw err;
                var requestQty = buyItemAnswer.itemQuantity;
                if (requestQty <= res[0].stock_quantity) {
                    console.log("The total amount due is: $" + (requestQty * parseInt(res[0].price)));
                    console.log("Thank you, your receipt is here. You can download it or print it.");
                    var updateQuery = 'UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?';
                    connection.query(updateQuery, [requestQty, buyItemAnswer.itemId], function (err, res) {
                        if (err) throw err;
                    });
                } else {
                    console.log("I'm sorry, we don't have this quantity.");
                }
                displayProductsList();
            });
        });
}

logo();
displayProductsList();