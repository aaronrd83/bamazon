var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password1",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    //console.log("conncected as id " + connection.threadId + "\n");
    displayItems()
    idSearch()
})

function displayItems() {

    var query = "SELECT * FROM products"
    connection.query(query, function (err, res) {
        console.log(res)
        for (var i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + " || Item: " + res[i].product_name + " || Price: " + res[i].price);
        }
    })
}

function idSearch() {
    connection.query("SELECT * FROM products", function (err, res) {
        var idNums = []
        for (var i = 0; i < res.length; i++) {
            idNums.push(res[i].item_id)
             }
        inquirer
            .prompt([{
                name: "id",
                type: "input",
                message: "Enter the item id number you would like to buy",
                validate: function(value) {
                    if (idNums.includes(parseInt(value))) {
                        return true;
                    }
                    return false || "Please enter a valid item_id"
                }
            },
        {
            name: "units",
            type: "input",
            message: "How many units would you like?"
            }
        ])



    })
}