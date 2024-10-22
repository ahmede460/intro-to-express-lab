const express = require("express")

const app = express();
const port = 3000;


const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];



app.listen(port, () => {
    console.log(`[+] Listening on port: ${port}`);
});

app.get("/greetings/:username", (request, response) => {
    return response.send(`Hello there, ${request.params.username}!`)
});


app.get("/roll/:rollNumber", (request, response) => {


    userNumber = parseInt(request.params.rollNumber)
    if (userNumber) {
        randomRoll = Math.floor(Math.random() * (userNumber + 1))
        return response.send(`You rolled a ${randomRoll}!`)
    }
    else {
        return response.send("Please enter a valid number.")
    }

});

app.get("/collectibles/:index", (request, response) => {
    if (collectibles[request.params.index]) {
        return response.send(`So, you want the ${collectibles[request.params.index].name} For ${collectibles[request.params.index].price}, it can be yours!`)
    }
    else {
        return response.send("This item is not yet in stock. Check back soon!")
    }

});

app.get('/hello', (request, response) => {
    response.send(`Hello there, ${request.query.name}! I hear you are ${request.query.age} years old!`);
});


app.get('/shoes', (request, response) => {
    let finalText = ""
    minPrice = request.query["min-price"];
    maxPrice = request.query["max-price"];
    type = request.query["type"].toLowerCase();
    let searchedArray = shoes
    if (minPrice) {
        searchedArray = searchedArray.filter((item) => item.price >= minPrice);
    }
    if (maxPrice) {
        searchedArray = searchedArray.filter((item) => item.price <= maxPrice);
    }
    if (type) {
        searchedArray = searchedArray.filter((item) => item.type == type);
    }

    for (const shoe of searchedArray) {
        finalText += `name: ${shoe.name}, type: ${shoe.type}, price: ${shoe.price}$<br>`
    }

    response.send(finalText);
});



