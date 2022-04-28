let userService = require('../services/user-service');

async function getUser(req,res){
    const {id} = req.params;
    try{
        let data = await userService.getUser(id);
        return res.render('user/detail', {data:data, name:"22110096"});
    }catch(err){
        console.log(err);
        return resizeBy.status(500).json(err);
    }
}

async function getUsers(req,res){
    try{
        let data = await userService.getUsers();
        return res.render('user/list', {data:data, name:"22110096"});
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
}

async function insertUser(req,res){
    const {email,name,password, number,phone1,phone2,phone3} = req.body;
    let phone = phone1 + phone2+ phone3;
    try{
        let data = await userService.insertUser(email,name,password,phone,number);
        return res.redirect('/user')
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
}

async function updateUser(req,res){
    const {id} = req.params;
    const {email,password,phone} = req.body;
    try{
        let data = await userService.updateUser(id, email, password, phone);
        return res.redirect('/user');
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
}

async function deleteUser(req,res){
    const {id} = req.params;
    try{
        let data = await userService.deleteUser(id);
        return res.redirect('/user');
    }catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
}

module.exports ={
    getUser:getUser,
    getUsers:getUsers,
    insertUser:insertUser,
    updateUser:updateUser,
    deleteUser:deleteUser
}