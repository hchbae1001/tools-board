var express = require('express');
var router = express.Router();
let userController = require('../controllers/user-controller');

//로그인
router.get('/',function(req,res){
  return res.render('user/login');
});
router.post('/', userController.loginUser);

//회원가입 폼 페이지 + 가입
router.get('/insert',function(req,res){
  res.render('user/insert');
});
router.post('/insert',userController.insertUser);

// 관리자용 회원 리스트 확인
router.get('/list', userController.getUsers);

// 정보, 업데이트, 삭제
router.get('/:id',userController.getUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// 로그아웃
router.get('/:id/logout', userController.logOutUser);

module.exports = router;