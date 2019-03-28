
const handleEntry = (req,res,db) => {
	const{category, title,description,email,phone,address,city,state,budget,account_id} = req.body;
	db.transaction(trx=>{
		trx.insert({
		category: category,
		title: title,
		description: description,
		email:email,
		phone: phone,
		address: address,
		city: city,
		state:state,
		budget:budget,
		post_date: new Date(),
		account_id:account_id
	})
	.into('post')
	.returning('account_id')
	.then(id => {
	  return trx('account')
		.returning("entries")
		.where("id","=",id[0])
		.increment('entries',1)
		.returning('entries')
		.then(entries=> res.json(entries[0]));
	})
	.then(trx.commit)
	.catch(trx.rollback)
	})
	.catch(err=> res.status(400).json("unable to post"))	

}


module.exports={
	handleEntry: handleEntry
}