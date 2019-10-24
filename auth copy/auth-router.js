const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../database/dbConfig.js');
const restricted = require('./authenticate-middleware.js')
const secrets = require('../secrets.js')



router.get('/users',restricted, (req, res) => {
  db('users')
  .then(users => {
    res.send(users)
  })
});



router.post('/register', (req, res) => {
  const newMember = req.body;
  newMember.password = bcrypt.hashSync(newMember.password, 12)

  db('users').insert(newMember)
  .then(registeredUser => {
        const token = generateToken(registeredUser)
        res.status(200).json({
            user: registeredUser,
            token
        })
    })
    .catch(error => {
        res.status(500).json({
            message: `${error}`
        })
    })

});

router.post('/login', (req, res) => {
  const {username , password} = req.body;
    db('users').where({username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password , user.password)){
            const token = generateToken(user)
            res.status(200).json({
                message: `welcome ${user.username}`,
                token
            })
        } else {
            res.status(404).json({
                message: `user not found`
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: `${err}`
        })
    })
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
