const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
// Define the login route
app.get('/login', (req, res) => {
  res.send(`
    <form id ="form" onsubmit="myFunction()">
      <label>Username:</label>
      <input id = "username" type="text" name="username" />
      <button type="submit">Login</button>
    </form>
    <script>
    const input = document.getElementById('username');
    const form = document.getElementById('form');
    form.onsubmit = function(e){
        e.preventDefault();
        const username = input.value;
        localStorage.setItem('username', username);
        window.location.href = '/';
        };
    </script>
  `);
});

// Define the home page route
app.get('/', (req, res) => {
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
app.post('/', (req, res) => {
    console.log(req.body)
  const { username, message } = req.body;
  fs.appendFile('messages.txt', `"${username}": "${message}"\n`, (err) => {
    if (err) throw err;
    console.log('Message saved!');
  });
  res.redirect('/');
});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
