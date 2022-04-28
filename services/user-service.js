let pool = require('../config/pool');
let userQuery = require('../query/userQuery');

//1개한 정보만 보는것
async function getUser(id){
    try{
        let data = await pool.query(userQuery.getUser, id);
        return data[0]
    }catch(err){
        console.log(err);
        throw Error(err)
    }
}
//모든 정보 ?
async function getUsers(){
    try{
        let data = await pool.query(userQuery.getUsers);
        return data[0]
    }catch(err){
        console.log(err);
        throw Error(err)
    }
}

async function insertUser(email, name, password,phone, number){
    //set = ?
    try{
         let data = await pool.query(userQuery.insertUser,{
            email:email,
            name:name,
            password:password,
            phone:phone,
            number:number
        });
        return data[0]
    }catch(err){
        console.log(err);
        throw Error(err)
    }
}

async function updateUser(id, email,password,phone){
    try{
        let data = await pool.query(userQuery.updateUser, [
            email,password,phone,id
        ]);
        return data[0]
    }catch(err){
        console.log(err);
        throw Error(err)
    }
}

async function deleteUser(id){
    try{
        let data = await pool.query(userQuery.deleteUser, id);
        return data[0]
    }catch(err){
        console.log(err);
        throw Error(err)
    }
}

module.exports ={
    getUser:getUser,
    getUsers:getUsers,
    insertUser:insertUser,
    updateUser:updateUser,
    deleteUser:deleteUser
}