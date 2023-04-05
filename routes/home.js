const fs = require('fs');

const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    let chat = "Nothing available"
    try {
      chat = fs.readFileSync('messages.txt', 'utf8');
    } catch (error) {
      
    }
    
    res.send(`
    <body>
    <h1>Messages</h1>
    <p>${chat}</p>
    <br>
      <form method="POST" action="/">
        <label>Message:</label>
        <input type="text" name="message" />
        <input type="text" id="username" name="username" readonly>
        <button type="submit">Send</button>
      </form>
      <script>
      window.addEventListener("DOMContentLoaded", ()=>{
        const username = localStorage.getItem('username');
        if(username){
            document.getElementById('username').value = username;
        }else{
            window.location.href = '/login';
        }
      });
      </script>
      </body>
    `);
});

// Handle the message sending form submission
router.post('/', (req, res) => {
  const { username, message } = req.body;
  fs.appendFile('messages.txt', `"${username}": "${message}"\n`, (err) => {
    if (err) throw err;
    console.log('Message saved!');
  });
  res.redirect('/');
});
module.exports = router
  