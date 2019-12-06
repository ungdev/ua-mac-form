const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const sqlite3 = require('sqlite3').verbose()

const db =  new sqlite3.Database('base.sql');

db.run(`
  CREATE TABLE IF NOT EXISTS players
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      pseudo VARCHAR(255) NOT NULL,
      tournament VARCHAR(255) NOT NULL
    );
`)

app.use(bodyParser.json())

app.post('/submit', (req, res) => {
  const { name, pseudo, tournament } = req.body

  if (
    !name || name.length < 2 ||
    !pseudo || pseudo.length < 2 ||
    !tournament || tournament.length < 2
  ) {
    return res.sendStatus(400)
  }

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  db.run(`
    INSERT INTO
    players (ip, name, pseudo, tournament)
    VALUES (?, ?, ?, ?)
  `, [ ip, name, pseudo, tournament ], () => {
    res.sendStatus(200)
  })
})

app.use(express.static('build'));

const port = process.env.PORT || 3000
const bind = process.env.BIND || '0.0.0.0'
app.listen(port, bind, function () {
  console.log(`Auth listening on ${bind}:${port}`)
})
