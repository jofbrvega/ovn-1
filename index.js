const express = require('express')

// Kopplar detta dokument till cars.js
const cars = require('./cars.js')

const express = require('express');
const cars = require('./cars.js');
const app = express();
const users = require('./users.js');

// Hämta ett nytt ID från en array
function getId(list) {
    // Hämtar sista objektet i en rray 
    const lastItem = list.slice(-1)[0]
    let id = (lastItem?.id)

    id = id ? id + 1 : 1;
    return id;
}

// Här skapar vi app, och kopplar det för att arbeta med routes. 
app.use(express.json())

// --------- /CARS ----
// Här skapar vi en funktion, som ger en respond på "Cars". Eftersom cars är inom citat-tecken.
app.get('/', (req, res) => {
    res.send('Cars')
})
// Här skapar vi en funktion, som skapar en respond på hela cars.js filen. (Se rad 3.)
app.get('/cars', (req, res) => {
    res.send(cars)
})
// Här skapar vi en funktion som hämtar enstaka cars genom deras ID från cars.js, genom deras ID som parse:as till HTML. 
app.get('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id) // denna raden hämtar ID från URL:en
    const car = cars.find(c => c.id === id)
    res.send(car)
})

// POST; här skapar vi en funktion som gör det möjligt att lägga till ett till objekt med ett nytt ID
app.post('/cars', (req, res) => {
    const id = getId(cars)
    const newCar = {
        id,
        make: req.body.make,
        model: req.body.model
    }

    cars.push(newCar)
    res.send({ id })
})

// PUT (update); här hämtas ett specifik ID och gör det möjligt att ändra den.
app.put('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = cars.findIndex(c => c.id === id)
    cars[index].make = req.body.make
    cars[index].model = req.body.model
    res.sendStatus(200)
})

// DELETE; här hämtas ett specifikt ID för att sedan radera den från array.
app.delete('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = cars.findIndex(c => c.id === id)
    cars.splice(index, 1) // Splice plockar bort en produkt från en array. 
    res.sendStatus(200)
})
// ---------- /CARS ----


// ---------- USERS 
app.get('/users', (req, res) => {
    res.send(users)
})

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(u => u.id === id)
    res.send(user)
})

app.post('/users/', (req, res) => {
    const id = getId(users)

    const newUser = {
        id,
        name: req.body.name,
        description: req.body.description,
    }

    users.push(newUser)

    res.send({ id })
})

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(u => u.id === id)
    user.name = req.body.name
    user.description = req.body.description
    res.sendStatus(200)
})

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = users.findIndex(u => u.id === id)
    users.splice(index, 1)
    res.send(200)
})
// --------- USERS


// Här skapar vi en funktion som ber appen att lyssna på port 8000. 
app.listen(8000, () => {
    console.log("http://localhost:8000/")
})
