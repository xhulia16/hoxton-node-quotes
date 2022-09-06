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

const createQuote = db.prepare(`
INSERT INTO quotes(quote, authorId) Values(?,?);
`)

const createAuthor = db.prepare(`
INSERT INTO authors(firstName, lastName, age, image) VALUES(?,?,?,?);
`)

const deleteSingleQuote=db.prepare(`
DELETE FROM quotes WHERE id=?;
`)

const deleteSingleAuthor=db.prepare(`
DELETE FROM authors WHERE id=?;
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

app.post("/quotes", (req, res) => {

    //     let errors: string[] = []

    //     if (typeof req.body.quote !== "string") {
    //         errors.push("Please enter a valid title")
    //     }
    //     if (typeof req.body.authorId !== "number" || req.body.authorId > authors.length || req.body.authorId < 0) {
    //         errors.push("Please enter a valid author")
    //     }

    //     if (errors.length === 0) {
    const quoteInfo = createQuote.run(req.body.quote, req.body.authorId)
    const quote = getSingleQuote.get(quoteInfo.lastInsertRowid)
    res.send(quote)
    //     }
    //     else {
    //         res.status(400).send({ errors: errors })
    //     }

})

app.post("/authors", (req, res) => {
    const authorInfo = createAuthor.run(req.body.firstName, req.body.lastName, req.body.age, req.body.image)
    const author = getSingleAuthor.get(authorInfo.lastInsertRowid)
    res.send(author)
})

app.delete("/quotes/:id", (req, res) => {
    let id = Number(req.params.id)
    deleteSingleQuote.run(id)
    res.send({ message: 'Quote deleted successfully.' })
})

app.delete("/authors/:id", (req, res) => {
    let id = Number(req.params.id)
    deleteSingleAuthor.run(id)
    res.send({ message: 'Author deleted successfully.' })
})



app.listen(port)