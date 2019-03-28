const handleProfile=(req,res,db)=>{

	const{id} = req.params;
	
	db.select('*').from('account').where({id})
	.then(acc=>{
		if(acc.length){
			res.json(acc[0]);
		}else{
			res.status(400).json('Not found')
		}
		
	})
	.catch(err=> res.status(400).json('Error getting user'))
}

const handleGetEntry = (req,res,db) =>{
	const {id} = req.body;
	db.select('*').from('post').where('account_id', '=', id)
	.then(entry => {
		if(entry.length > 0){
			res.json(entry);
		}
		else{
			res.json('No entry')
		}	
	})
	.catch(err=> res.status(400).json('Error getting entry'))
}

module.exports={
	handleProfile,
	handleGetEntry
}