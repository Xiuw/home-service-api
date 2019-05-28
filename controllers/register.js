
const handleRegister = (req,res,db,bcrypt) => {
	const{ firstname, lastname, email,password } = req.body;
	
	const hash= bcrypt.hashSync(password);
	  db.transaction(trx=>{
	  		trx.insert({
	  		password:hash,
	  		email:email,
	  	})
	  	.into('login')
	  	.returning('email')
	  	.then(loginEmail => {
	  		return trx('account')
			.returning('*')
			.insert({
				firstname:firstname,
				lastname:lastname,
				email:loginEmail[0],
				joined:new Date()
		
	  		})
			.then(acc =>{
				res.json(acc[0]);
			})

	  	})
	  	.then(trx.commit)
	  	.catch(trx.rollback)
	 })
	  .catch(err=> console.log("unable to register"));

}


module.exports={
	handleRegister:handleRegister
}