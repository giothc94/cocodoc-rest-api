--
-- Dumping data for table `rol_user`
--
use `cocodoc`;
LOCK TABLES `rol_user` WRITE;
/*!40000 ALTER TABLE `rol_user` DISABLE KEYS */;
INSERT INTO `rol_user` VALUES (1,'admin','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a'),(2,'secretary','75d6c468aa70c0b824808c9e86f7261f0edefefb76667b28e28d51056c3792d7'),(3,'intern','56fe5e488af143480911cf178fa325a2a78ee85df7e38e65c509db34db9fcf54');
/*!40000 ALTER TABLE `rol_user` ENABLE KEYS */;
UNLOCK TABLES;

call sp_ingresar_scope('read:directory','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a');
call sp_ingresar_scope('create:directory','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a');
call sp_ingresar_scope('update:directory','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a');
call sp_ingresar_scope('delete:directory','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a');
call sp_ingresar_scope('create:files','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a');
call sp_ingresar_scope('delete:files','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a');
call sp_ingresar_scope('read:files','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a');
call sp_ingresar_scope('read:roles','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a');
call sp_ingresar_scope('read:scopes','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a');
call sp_ingresar_scope('create:scope','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a');
call sp_ingresar_scope('delete:scope','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a');
call sp_ingresar_scope('read:users','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a');
call sp_ingresar_scope('create:users','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a');
call sp_ingresar_scope('update:users','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a');
call sp_ingresar_scope('delete:users','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a');
call sp_ingresar_scope('read:directory','75d6c468aa70c0b824808c9e86f7261f0edefefb76667b28e28d51056c3792d7');
call sp_ingresar_scope('create:directory','75d6c468aa70c0b824808c9e86f7261f0edefefb76667b28e28d51056c3792d7');
call sp_ingresar_scope('update:directory','75d6c468aa70c0b824808c9e86f7261f0edefefb76667b28e28d51056c3792d7');
call sp_ingresar_scope('delete:directory','75d6c468aa70c0b824808c9e86f7261f0edefefb76667b28e28d51056c3792d7');
call sp_ingresar_scope('create:files','75d6c468aa70c0b824808c9e86f7261f0edefefb76667b28e28d51056c3792d7');
call sp_ingresar_scope('delete:files','75d6c468aa70c0b824808c9e86f7261f0edefefb76667b28e28d51056c3792d7');
call sp_ingresar_scope('read:files','75d6c468aa70c0b824808c9e86f7261f0edefefb76667b28e28d51056c3792d7');
call sp_ingresar_scope('read:roles','75d6c468aa70c0b824808c9e86f7261f0edefefb76667b28e28d51056c3792d7');
call sp_ingresar_scope('read:scopes','75d6c468aa70c0b824808c9e86f7261f0edefefb76667b28e28d51056c3792d7');
call sp_ingresar_scope('read:users','75d6c468aa70c0b824808c9e86f7261f0edefefb76667b28e28d51056c3792d7');
call sp_ingresar_scope('create:users','75d6c468aa70c0b824808c9e86f7261f0edefefb76667b28e28d51056c3792d7');
call sp_ingresar_scope('update:users','75d6c468aa70c0b824808c9e86f7261f0edefefb76667b28e28d51056c3792d7');
call sp_ingresar_scope('read:directory','56fe5e488af143480911cf178fa325a2a78ee85df7e38e65c509db34db9fcf54');
call sp_ingresar_scope('create:directory','56fe5e488af143480911cf178fa325a2a78ee85df7e38e65c509db34db9fcf54');
call sp_ingresar_scope('update:directory','56fe5e488af143480911cf178fa325a2a78ee85df7e38e65c509db34db9fcf54');
call sp_ingresar_scope('create:files','56fe5e488af143480911cf178fa325a2a78ee85df7e38e65c509db34db9fcf54');
call sp_ingresar_scope('read:files','56fe5e488af143480911cf178fa325a2a78ee85df7e38e65c509db34db9fcf54');
call sp_ingresar_scope('delete:files','56fe5e488af143480911cf178fa325a2a78ee85df7e38e65c509db34db9fcf54');
call sp_ingresar_scope('read:users','56fe5e488af143480911cf178fa325a2a78ee85df7e38e65c509db34db9fcf54');
call sp_ingresar_scope('delete:directory','56fe5e488af143480911cf178fa325a2a78ee85df7e38e65c509db34db9fcf54');