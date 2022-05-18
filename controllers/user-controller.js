let userService = require('../services/user-service');
const bcrypt = require('bcrypt');
let models = require('../models');
async function loginUser(req,res){
    const {email,password} = req.body
    try{
        // let data = await userService.logInUser(email);
        // let row = data[0];
        let row = await models.user.findOne({where:{email:email}});
        console.log(row);
        console.log(row.password);
        const compare = bcrypt.compareSync(password,row.password);
        if(compare){
            sess = req.session;
            sess.userName = row.name;
            sess.userId = row.id;
            return res.redirect('/');
        }else{
            return res.redirect('/user');
        }
    }catch(err){
        console.log(err);
        return res.redirect('/user');
    }
}

async function getUser(req,res){
    const {id} = req.params;
    try{
        // let data = await userService.getUser(id);
        let data = await models.user.findOne({where:{id:id}});
        return res.render('user/detail',{data:data, name:req.session.userName, id:req.session.userId});
    }catch(err){
        return res.status(500).json(err);
    }
}

async function getUsers(req,res){
    try{
        // let data = await userService.getUsers();
        let data = await models.user.findAll();
        return res.render('user/list',{data:data, name:req.session.userName, id:req.session.userId});
    }catch(err){
        return res.status(500).json(err);
    }
}

async function insertUser(req,res){
    const {email,password,number,name,phone1,phone2,phone3} = req.body
    let phone = phone1 + phone2 + phone3;
    try{
        const encryptedPW = bcrypt.hashSync(password, 10);
        // await userService.insertUser(email,encryptedPW,number,name,phone);
        await models.user.create({
            email:email,
            password:encryptedPW,
            number:number,
            name:name,
            phone:phone
        })
        return res.redirect('/user');
    }catch(err){
        return res.status(500).json(err);
    }
}

async function updateUser(req,res){
    const {id} = req.params;
    const {email,password,phone} = req.body;
    try{
        const encryptedPW = bcrypt.hashSync(password, 10);
        // await userService.updateUser(id,email,encryptedPW,phone);
        await models.user.update({
            email:email,
            password:encryptedPW,
            phone:phone},{where:{id:id}});
        return res.redirect('/user/logout');
    }catch(err){
        return res.status(500).json(err);
    }
}

async function deleteUser(req,res){
    
    const {id} = req.params;
    console.log("userDelete");
    try{
        // await userService.deleteUser(id);
        await models.user.destroy({where:{id:id}});
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