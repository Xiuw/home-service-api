const express = require('express');
const knex = require('knex');
const bodyParser = require('body-parser');
const cors= require('cors');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const entry = require('./controllers/entry');
const login = require('./controllers/login');
const profile = require('./controllers/profile');
const getentry = require('./controllers/profile');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'Xiuneh',
    password : '',
    database : 'db'
  }
});

// db.select('*').from('post').then(data => {
// 	console.log(data);
// });

app.get('/', (req,res) =>{
	res.send('Okay');
});

app.get('/allpost',(req,res) => {db.select('*').from('post').then(data=> res.json(data));})
app.post('/entry',(req,res) => {entry.handleEntry(req,res,db)});
app.post('/register',(req,res) =>{register.handleRegister(req,res,db,bcrypt)});
app.post('/login',(req,res) => {login.handleLogin(req,res,db,bcrypt)});
app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)});
app.get('/getentry', (req,res)=>{getentry.handleGetEntry(req,res,db)});



app.listen(3000);


