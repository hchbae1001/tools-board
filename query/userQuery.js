exports.getUser = 'select * from user where id=?';
exports.getUsers = 'select * from user';
exports.insertUser = 'insert into user set ?';
exports.updateUser = 'update user set name = ?, password = ?';
exports.deleteUser = 'delete from user where id = ?';