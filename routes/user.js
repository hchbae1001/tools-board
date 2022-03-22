var express = require('express');
var router = express.Router();
let userController = require('../controllers/user-controller');


//회원가입 폼 페이지
router.get('/create',function(req,res){
  res.render('user/insert');
});

router.get('/',userController.getUsers);
router.get('/:userId',userController.getUser);
router.post('/',userController.insertUser);
router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
