import express from 'express'
import cors from 'cors'
import Database from "better-sqlite3"

const app = express()
app.use(express.json())
app.use(cors())

const port = 5001
const db = Database("data.db", { verbose: console.log })

const getAllQuotes = db.prepare(`
SELECT * FROM quotes
`)

const getAllAuthors = db.prepare(`
SELECT * FROM authors
`)

const getSingleQuote = db.prepare(`
SELECT * FROM quotes WHERE id=? 
`)

const getSingleAuthor = db.prepare(`
SELECT * FROM authors WHERE id=? 
`)

app.get("/", (req, res) => {
    res.send("hello")
})

app.get("/quotes", (req, res) => {
    const quotes = getAllQuotes.all()
    res.send(quotes)
})

app.get("/quotes/:id", (req, res) => {
    const id = Number(req.params.id)
    const quote = getSingleQuote.get(id)
    res.send(quote)
})

app.get("/authors", (req, res) => {
    const authors = getAllAuthors.all()
    res.send(authors)
})

app.get("/authors/:id", (req, res) => {
    const id = Number(req.params.id)
    const author = getSingleAuthor.get(id)
    res.send(author)
})

app.listen(port)