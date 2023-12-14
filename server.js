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
    //genSalt() for generating salt to make password more secure
    const salt = await bcrypt.genSalt()

    //use this to hash password and then pass in the salt that has been generated
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    console.log(salt)
    console.log(hashedPassword)
    const user = { name: req.body.username, password: hashedPassword }
    users.push(user)
    res.status(201).send()
  } catch (error) {
    res.status(500).send()
  }
})
app.listen(3000, () => console.log('listening at 3000'))
