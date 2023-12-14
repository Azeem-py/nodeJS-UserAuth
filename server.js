const express = require('express')
const bcrypt = require('bcrypt')

const app = express()

app.use(express.json())

const users = []
app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', async (req, res) => {
  try {
    // another way to hash and salt without using the genSalt() method is to do it in the hash method
    const hashedPassword = await bcrypt.hash(req.body.password, 10) //by passing ten we are auto telling hash to add a salt of 10 rounds which is btw the default
    console.log(hashedPassword)
    const user = { name: req.body.name, password: hashedPassword }
    users.push(user)
    res.status(201).send()
  } catch (error) {
    res.status(500).send()
  }
})

app.post('/users/login', async (req, res) => {
  const user = users.find((user) => user.name === req.body.name)

  if (!user) {
    return res.status(404).send('user not found')
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      return res.send('Success')
    } else {
      return res.send('not allowed')
    }
  } catch {
    return res.status(500)
  }
})

app.listen(3000, () => console.log('listening at 3000'))
