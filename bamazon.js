var mysql = require("mysql");
var inquirer = require("inquirer");
const { table } = require("table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "b469modid",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    logo();
    runBamazon();
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
        "▄█████████▀xxxx███xxxx█▀xxx▀█xxx███xxx█▀xxxx███xxxx█▀xxx▀████████▀xx▀██████▀xxx▀█xxx█▀xx\n" +
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n");
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
        // return 0;
        runBamazon();
    });
}

function buyItem() {

    inquirer
        .prompt([
            {
                name: 'itemId',
                type: 'input',
                message: 'Please, enter the product ID you want to buy: ',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
            },
            {
                name: 'itemQuantity',
                type: 'input',
                message: 'How many units do you want to buy? ',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
            },
        ])
        .then(function (answer) {
            var query = 'SELECT product_name, price, stock_quantity FROM products where item_id = ?';
            connection.query(query, [answer.itemId], function (err, res) {
                if (err) throw err;
                // console.log(res);
                for (var i = 0; i < res.length; i++) {
                  console.log(
                    'Item ID: ' +
                      answer.itemId +
                      ' || Product: ' +
                      res[i].product_name +
                      ' || Unit Price: ' +
                      res[i].price +
                      ' || Units Available: ' +
                      res[i].stock_quantity
                  );
                }
                /*runSearch();
              });*/
            });
        });
}


function runBamazon() {

    inquirer
        .prompt({
            name: "buyingId",
            type: "rawlist",
            message: "Welcome to Bamazon! What can I do for you today?",
            choices: [
                "List products",
                "Buy a product",
                "Exit"
            ]
        })
        .then(function (answer) {
            switch (answer.buyingId) {
                case "List products":
                    // console.log("Displaying list of items");
                    displayProductsList();
                    break;
                case "Buy a product":
                    buyItem();
                    break;
                case "Exit":
                    console.log("Thank you for your visit and welcome back anytime.");
                    connection.end();
                    break;
            }
        });
}




