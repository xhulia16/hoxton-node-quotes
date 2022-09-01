import express from 'express'
import cors from 'cors'
import { quotesData, authors } from "./data"

let quotes = quotesData
const app = express()
const port = 5000
app.use(express.json())





app.use(cors())
app.get("/", (req, res) => {
    res.send("hello")
})

app.get("/quotes", (req, res) => {
    let quotesToSend = quotes.map(quote => {
        let author = authors.find(item => item.id === quote.authorId)
        return { ...quote, author }
    })
    res.send(quotesToSend)
})

app.get("/authors", (req, res) => {
    res.send(authors)
})

app.get("/quotes/:id", (req, res) => {
    const id = Number(req.params.id)
    const singleQuote = quotes.find(item => item.id === id)
    const author = authors.find(item => item.id === singleQuote?.authorId)
    if (singleQuote) {
        res.send({ ...singleQuote, author })
    }
    else {
        res.status(404).send({ error: "not found!" })
    }

})

app.get("/random", (req, res) => {
    let random = Math.floor(Math.random() * (quotes.length))
    let quoteToSend = quotes[random]
    console.log(quoteToSend)
    let author = authors.find(author => author.id === quoteToSend?.authorId)
    res.send({ ...quoteToSend, author })
})

app.post("/quotes", (req, res) => {

    let errors: string[] = []

    if (typeof req.body.quote !== "string") {
        errors.push("Please enter a valid title")
    }
    if (typeof req.body.authorId !== "number" || req.body.authorId > authors.length || req.body.authorId < 0) {
        errors.push("Please enter a valid author")
    }

    console.log(req.body)
    if (errors.length === 0) {
        const newQuote = {
            id: quotes[quotes.length - 1].id + 1,
            quote: req.body.quote,
            authorId: req.body.authorId
        }
        quotes.push(newQuote)
        res.send(newQuote)
    }
    else {
        res.status(400).send({ errors: errors })
    }

})



app.post("/authors", (req, res) => {
    let errors: string[] = []

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
    console.log(req)
    if (errors.length === 0) {
        const newAuthor = {
            id: authors[authors.length - 1].id + 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            image: req.body.image,

        }
        authors.push(newAuthor)
        res.send(newAuthor)
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

// app.patch("/quotes/:id", (req, res) => {
//     let id = Number(req.params.id)
//     let match = quotes.find(quote => quote.id === id)
//     if(match){

//     if (req.body.quote) {
//         match.quote = req.body.quote
//     }
//     if (req.body.firstName) {
//         match.firstName = req.body.firstName
//     }
//     if (req.body.lastName) {
//         match.lastName = req.body.lastName
//     }
//     if (req.body.age) {
//         match.age = req.body.age
//     }
//     if (req.body.image) {
//         match.age = req.body.image
//     }
//     res.send(match)}
//     else {
//         res.status(404).send({ error: 'Quote not found.' })
//       }
// })

app.listen(port)