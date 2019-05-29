const handleEntry = (req,res,db) => {
	const{category,title,description,email,phone,address,city,state,budget,account_id} = req.body;
	if(!category ||!title|| !description||!phone ||!city || !state || !account_id){
		return res.status(400).json('Error')
	}
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
		.returning('id')
		.then(id=> res.json(id[0]));
	})
	.then(trx.commit)
	.catch(trx.rollback)
	})
	.catch(err=> res.status(400).json("unable to post"))	

}


const handleSelectPost=(req,res,db)=>{
	const{id} = req.params;
	console.log(id);
	db.select('*').from('post').where({id})
	.then(post=>{
		if(post.length){
			res.json(post[0]);
		}else{
			res.status(400).json('Post Not Found')
		}	
	})
	.catch(err=> res.status(400).json('Error getting post'))
}


module.exports={
	handleEntry: handleEntry,
	handleSelectPost:handleSelectPost
}