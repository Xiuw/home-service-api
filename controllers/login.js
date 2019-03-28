const handleLogin = (req,res,db,bcrypt)=>{
	const{email,password} = req.body;
	// if(!email || !password){
	// 	return res.status(400).json('incorrect form submission')
	// }
	db.select('email','password').from('login')
	.where('email', '=', email)
	.then(data=>{
		const isValid=bcrypt.compareSync(password,data[0].password);
		// console.log(isValid);
		if(isValid){
			return db.select('*').from('account')
			.where('email', '=',email)
			.then(acc => {
				res.json(acc[0])
			})
			.catch(err=>res.status(400).json('unable to get user'))
		}else{
			res.status(400).json('Wrong credentials')
		}
		
	})
	.catch(err=>res.status(400).json('Wrong credentials'))
}

module.exports={
	handleLogin:handleLogin
}