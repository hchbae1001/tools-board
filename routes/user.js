var express = require('express');
var router = express.Router();
let userController = require('../controllers/user-controller');


//회원가입 폼 페이지 /user/create
router.get('/create',function(req,res){
  res.render('user/insert');
});
//user List
router.get('/',userController.getUsers);

//user detail
router.get('/:id',userController.getUser);

//user insert
router.post('/',userController.insertUser);

//user update
router.patch('/:id', userController.updateUser);

//user delete
router.delete('/:id', userController.deleteUser);

module.exports = router;
