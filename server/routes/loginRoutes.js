const UserSchema = require('../models/UserSchema')
const EmpSchema = require('../models/EmpSchema')

const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

// let MongoClient = require('mongodb').MongoClient;


router.post('/register', async (req, res) => {
  const { email, password, username } = req.body

  if (!email || !password || !username)
    return res.status(400).json({ msg: 'username, emaila and password are required' })

  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: 'Password should be at least 8 characters long' })
  }

  const user = await EmpSchema.findOne({ email })
  if (user) return res.status(400).json({ msg: 'User already exists' })

  const newUser = new EmpSchema({ username, email, password })
  var user_id = username + "_" + Date.now()

  const newuserData = Object.assign(newUser, { user_id: user_id })

  bcrypt.hash(password, 7, async (err, hash) => {
    if (err)
      return res.status(400).json({ msg: 'error while saving the password' })

    newuserData.password = hash

    console.log("newuserData", newuserData)
    const savedUserRes = await newuserData.save()

    if (savedUserRes)
      return res.status(200).json({ msg: 'user is successfully saved' })
  })
})

router.post(`/login`, async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ msg: 'Something missing' })
  }

  const user = await EmpSchema.findOne({ email: email }) // finding user in db
  if (!user) {
    return res.status(400).json({ msg: 'User not found' })
  }

  const matchPassword = await bcrypt.compare(password, user.password)

  if (matchPassword) {
    const userSession = { email: user.email, user_id: user.user_id } // creating user session to keep user loggedin also on refresh
    req.session.user = userSession // attach user session to session object from express-session

    return res
      .status(200)
      .json({ msg: 'You have logged in successfully', userSession }) // attach user session id to the response. It will be transfer in the cookies
  } else {
    return res.status(400).json({ msg: 'Invalid credential' })
  }

  // MongoClient.connect(process.env.DATABASE_CONNECTION_STRING, function (err, db) {
  //   if (err) throw err;
  //   var dbo = db.db("test");
  //   dbo.collection("emps").findOne(
  //     { email: email, },
  //     async function (err, result) {
  //       if (err) {
  //         return res.status(400).json({ msg: 'User not found', err })
  //       };
  //       const matchPassword = await bcrypt.compare(password, result.password)
  //       if (matchPassword) {
  //         const userSession = { email: result.email, user_id: result.user_id } // creating user session to keep user loggedin also on refresh
  //         req.session.user = userSession // attach user session to session object from express-session
  //         return res.status(200).json({ msg: 'You have logged in successfully', userSession }) // attach user session id to the response. It will be transfer in the cookies
  //       } else {
  //         return res.status(400).json({ msg: 'Invalid credential' })
  //       }
  //     });
  // });

})

router.delete(`/logout`, async (req, res) => {
  req.session.destroy((error) => {
    if (error) throw error

    res.clearCookie('session-id') // cleaning the cookies from the user session
    res.status(200).send('Logout Success')
  })
})

router.get('/isAuth', async (req, res) => {
  console.log("isAuth req", req.session.user)
  if (req.session.user) {
    return res.json(req.session.user)
  } else {
    return res.status(401).json('unauthorize')
  }
})

module.exports = router
