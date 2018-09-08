var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password1",
    database: "bamazon"
});

 connection.connect(function(err) {
     if (err) throw err;
     //console.log("conncected as id " + connection.threadId + "\n");
     displayItems()
 })

function displayItems() {
    
    var query = "SELECT * FROM products"
    connection.query(query, function(err, res) {
        //console.log(res)
        for (var i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + " || Item: " + res[i].product_name + " || Price: " + res[i].price);
          }
    })
}

