const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const sql = require('mysql');
const connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.get('/', (req, res) => {
    var query = 'SELECT * from users';
    connection.query(
        query, (error, result) => {
            if (error) console.log(error);
            res.render('index', {data: result});
        }
    );
})

app.post('/post', (req, res) => {
    var post = {
        id: req.body.id,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email
    }
    connection.query("INSERT INTO `users` SET ?", post, (error) => {
            if (error) console.log(error);
            res.redirect('/')
        }
    );
})

app.post('/put', (req, res) => {
    var post = {
        id: req.body.id,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email
    }
    var query = "Update `users` SET name=" + sql.escape(post.name) + ", surname=" + sql.escape(post.name) + ", email=" + sql.escape(post.email) + "where id=" + sql.escape(post.id);
    connection.query(query, (error) => {
            if (error) console.log(error);
            res.redirect('/')
        }
    );
})

app.get('/delete/:id', (req, res) => {
    var query = "DELETE FROM `users` WHERE id = " + sql.escape(req.params.id);
    connection.query(query, (error) => {
            if (error) console.log(error);
            res.redirect('/')
        }
    );
})
app.listen(9000);
