import express from 'express'
import cors from 'cors'

const app=express()
const port= 5000

const quotes=[
    {
        quote: "One cannot think well, love well, sleep well, if one has not dined well.",
        author: "Virginia Wolf"
    },
    {
        quote:  "Et tu, Brute?",
        author: "William Shakespeare"
    }, 
    {
        quote: "Three o'clock is always too late or too early for anything you want to do.",
        author: "Jean-Paul Sartre"
    },
    {
        quote: "Right or wrong, it's very pleasant to break something from time to time.",
        author: "Fyodor Dostoevsky"
    },
    {
        quote: "Should I kill myself, or have a cup of coffee?",
        author: "Albert Camus"
    }

]

function randomQuote(){
    return Math.floor(Math.random() * (quotes.length))
}

app.use(cors())
app.get("/", (req, res)=>{
res.send("hello")
})

app.get("/quotes", (req, res)=>{
    res.send(quotes)
})

app.get("/random", (req, res)=>{
    res.send(quotes[randomQuote()])
})

app.listen(port)