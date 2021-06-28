
const express = require('express')
const cors = require('cors')


const server = express()
server.use(express.json())
server.use(cors())


//users table
const users = [];


//create user information 
server.post('/create', (req, res) => {

    /**retrieving the username and password from the request */
    const { username, password, email, contact } = req.body

    /**check if username entered exists already */
    let results = users.filter((key) => key.username == username)
    if (results.length == 1) {
        res.send({ success: false, message: 'username already exists' })
    }

    /**if username doesnt exist */
    else {

        /**assigning the user details into an object to be stored in the users table */
        const userData = {
            username: username,
            password: password,
            email: email,
            contact: contact
        }

        /**finally push the details into the users table */
        users.push(userData)

        res.send({
            sucess: true,
            message: 'new user successfully created',
            responseData: users
        })
    }

})


//list user information 
server.get('/list', (req, res) => {

    const { username, password } = req.body
    // console.log(username, password);
    console.log(users);

    const results = users.filter((key) => key.username == username)
    // console.log(results);

    if (results.length == 1) {
        if (results[0].password == password) {
            res.send({ success: true, message: 'login successful' })
        }
        else {
            res.send({ success: false, message: 'username or password is incorrect' })
        }
    }
    else {
        res.send({ success: false, message: 'user doesnt exist' })
    }

})


//update user information (eg. contact)
server.post('/update', (req, res) => {

    const { username, password, contact } = req.body

    /**check if user's details exist in the users table */
    for (var count = 0; count < users.length; count++) {
        if ((users[count].username == username) && (users[count].password == password)) {

            /**if username and paswword exist we update the contact */
            users[count].contact = contact
            res.send({ success: true, message: 'user contact successfully updated', responseData: users })
        }
        else {
            res.send({ success: false, message: 'user cannot be found' })
        }
    }
})


const port = 4000;
server.listen(port, () => { console.log(`server listening on port ${port}`); })