let userService = require('../services/user-service');

async function loginUser(req,res){
    const {email,password} = req.body
    try{
        let data = await userService.logInUser(email);
        let row = data[0];
        if(row.password === password){
            sess = req.session;
            sess.userName = row.name;
            sess.userId = row.id;
            return res.redirect('/');
        }else{
            return res.redirect('/user')
        }
    }catch(err){
        return res.status(500).json(err);
    }
}

async function getUser(req,res){
    const {id} = req.params;
    try{
        let data = await userService.getUser(id);
        return res.render('user/detail',{data:data, name:sess.userName, id:sess.userId});
    }catch(err){
        return res.status(500).json(err);
    }
}

async function getUsers(req,res){
    try{
        let data = await userService.getUsers();
        return res.render('user/list',{data:data, data:data, name:sess.userName, id:sess.userId});
    }catch(err){
        return res.status(500).json(err);
    }
}

async function insertUser(req,res){
    const {email,password,number,name,phone1,phone2,phone3} = req.body
    let phone = phone1 + phone2 + phone3;
    try{
        await userService.insertUser(email,password,number,name,phone);
        return res.redirect('/user/list');
    }catch(err){
        return res.status(500).json(err);
    }
}

async function updateUser(req,res){
    const {id} = req.params;
    const {email,password,phone} = req.body;
    try{
        await userService.updateUser(id,email,password,phone);
        return res.redirect('/user/logout');
    }catch(err){
        return res.status(500).json(err);
    }
}

async function deleteUser(req,res){
    const {id} = req.params;
    try{
        await userService.deleteUser(id);
        return res.redirect('/user/list');
    }catch(err){
        return res.status(500).json(err);
    }
}

async function logOutUser(req,res){
    req.session.destroy();
    return res.redirect('/');
}

module.exports ={
    loginUser:loginUser,
    getUser:getUser,
    getUsers:getUsers,
    insertUser:insertUser,
    updateUser:updateUser,
    deleteUser:deleteUser,
    logOutUser:logOutUser
}