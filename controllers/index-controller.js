async function getIndex(req,res){
    try{
        return res.render('index',{title:'express'});
    }catch(err){
        return res.status(500).json(err);
    }
}

module.exports ={
    getIndex:getIndex
}