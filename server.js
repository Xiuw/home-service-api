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
const selectPost = require('./controllers/entry');

const db = knex({
  client: 'pg',
  connection:{
    connectionString:process.env.DATABASE_URL,
    ssl:true,
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());



// db.select('*').from('post').then(data => {
// 	console.log(data);
// });
app.get('/',(req,res)=>{
  res.send('Api is running');
})

app.get('/getall', (req,res) =>{db.select('*').from('post')
	.then(data=> { 
		let newArr = data.reverse(); 
		res.json(newArr);
	})
});
app.post('/entry',(req,res) => {entry.handleEntry(req,res,db)});
app.post('/register',(req,res) =>{register.handleRegister(req,res,db,bcrypt)});
app.post('/login',(req,res) => {login.handleLogin(req,res,db,bcrypt)});
app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)});
app.get('/getentry', (req,res)=>{getentry.handleGetEntry(req,res,db)});
app.get('/post/:id',(req,res)=> {selectPost.handleSelectPost(req,res,db)})


app.listen(process.env.PORT || 3000,()=>{
	console.log(`Running on Port ${process.env.PORT}`);
});




