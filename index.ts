import express from 'express'
import cors from 'cors'

const app = express()
const port = 5000
app.use(express.json())

let quotes = [
    {
        id: 1,
        quote: "One cannot think well, love well, sleep well, if one has not dined well.",
        firstName: "Virginia",
        lastName: "Wolf",
        age: 59,
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0b/George_Charles_Beresford_-_Virginia_Woolf_in_1902_-_Restoration.jpg"

    },
    {
        id: 2,
        quote: "Et tu, Brute?",
        firstName: "William",
        lastName: "Shakespeare",
        age: 52,
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Shakespeare.jpg"

    },
    {
        id: 3,
        quote: "Three o'clock is always too late or too early for anything you want to do.",
        firstName: "Jean-Paul",
        lastName: "Sartre",
        age: 74,
        image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Sartre_1967_crop.jpg"
    },
    {
        id: 4,
        quote: "Right or wrong, it's very pleasant to break something from time to time.",
        firstName: "Fyodor",
        lastName: "Dostoevsky",
        age: 59,
        image: "https://i.pinimg.com/736x/90/d2/db/90d2db4a942c7b64a37963328fea2be2.jpg"
    },
    {
        id: 5,
        quote: "Should I kill myself, or have a cup of coffee?",
        firstName: "Albert",
        lastName: "Camus",
        age: 46,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Albert_Camus%2C_gagnant_de_prix_Nobel%2C_portrait_en_buste%2C_pos%C3%A9_au_bureau%2C_faisant_face_%C3%A0_gauche%2C_cigarette_de_tabagisme.jpg/220px-Albert_Camus%2C_gagnant_de_prix_Nobel%2C_portrait_en_buste%2C_pos%C3%A9_au_bureau%2C_faisant_face_%C3%A0_gauche%2C_cigarette_de_tabagisme.jpg"
    }

]

function randomQuote() {
    return Math.floor(Math.random() * (quotes.length))
}

app.use(cors())
app.get("/", (req, res) => {
    res.send("hello")
})

app.get("/quotes", (req, res) => {
    res.send(quotes)
})

app.get("/quotes/:id", (req, res) => {
    const id = Number(req.params.id)
    const singleQuote = quotes.find(item => item.id === id)

    if (singleQuote) {
        res.send(singleQuote)
    }
    else {
        res.status(404).send({ error: "not found!" })
    }

})

app.get("/random", (req, res) => {
    res.send(quotes[randomQuote()])
})

app.post("/quotes", (req, res) => {

    let errors: string[] = []

    if (typeof req.body.quote !== "string") {
        errors.push("Please enter a valid title")
    }
    if (typeof req.body.firstName !== "string") {
        errors.push("Please enter a valid first name")
    }
    if (typeof req.body.lastName !== "string") {
        errors.push("Please enter a valid last name")
    }
    if (typeof req.body.age !== "number") {
        errors.push("Please enter a valid age")
    }
    if (typeof req.body.image !== "string") {
        errors.push("Please enter a valid image address")
    }

    console.log(req.body)
    if (errors.length === 0) {
        const newQuote = {
            id: quotes[quotes.length - 1].id + 1,
            quote: req.body.quote,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            image: req.body.image
        }
        quotes.push(newQuote)
        res.send(newQuote)
    }
    else {
        res.status(400).send({ errors: errors })
    }

})

app.delete("/quotes/:id", (req, res) => {
    let id = Number(req.params.id)
    console.log(id)
    quotes = quotes.filter(quote => quote.id !== id)
    res.send({ message: 'Quote deleted successfully.' })
})

app.patch("/quotes/:id", (req, res) => {
    let id = Number(req.params.id)
    let match = quotes.find(quote => quote.id === id)
    if(match){

    if (req.body.quote) {
        match.quote = req.body.quote
    }
    if (req.body.firstName) {
        match.firstName = req.body.firstName
    }
    if (req.body.lastName) {
        match.lastName = req.body.lastName
    }
    if (req.body.age) {
        match.age = req.body.age
    }
    if (req.body.image) {
        match.age = req.body.image
    }
    res.send(match)}
    else {
        res.status(404).send({ error: 'Quote not found.' })
      }
})

app.listen(port)