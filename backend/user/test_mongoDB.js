"use strict";

// var mongoDB_Connection = require("./mongoDB_connection");
var ObjectId = require('mongodb').ObjectID;
var user = require ("./user");
var data = {  //<ObjectId> 数据库自动生成，  用户登录成功后用于留言，点赞，保存头像路径
	"name" : "ABee",  //<string>
	"password" : "123456dd",  //<string>
	"question_step" : "Question-id",  //<ObjectId>记录用户当前所在问题
	"photo_path" : "/img/user/12345678.jpg",  //<string>用户头像所在服务器路径， 用户不一定要设置，未设置即为默认头像
	"current_chance" : 5   //<num>当前所剩回答次数， 为零后需要等待， 每隔一段时间后增加，上限为5
}

//insert data
// user.init(function(err){
// 	if(err){
// 		throw err;
// 	}else{
// 		user.createUser(data, function(err, result){
// 			if(err){
// 				throw err;
// 			}else{
// 				console.log(result);
// 			}
// 		});
// 		user.clean();
// 	}
// });

//find data
// user.init(function(err){
// 	if(err){
// 		throw err;
// 	}else{
// 		user.getUser("ABee","123456dd", function(err, document){
// 			if(err){
// 				throw err
// 			}else{
// 				console.log(document);
// 			}
// 		});
// user.clean();
// 	}
// });

//remove data
// user.init(function(err){
// 	if(err){
// 		throw err;
// 	}else{
// 		user.removeUser("ABee", function(err, document){
// 			if(err){
// 				throw err
// 			}else{
// 				console.log(document);
// 			}
// 		});
// 		user.clean();
// 	}
// });

//update data
// user.init(function(err){
// 	if(err){
// 		throw err;
// 	}else{
// 		user.updateQuestionStep("ABee","Quwwwus",function(err,object){
// 			if(err){
// 				throw err;
// 			}else{
// 				console.log(object);
// 			}
// 		});
// 		user.clean();
// 	}
// });

user.init(function(err){
	if(err){
		throw err;
	}else{
		user.updatePhotoPath("ABee","sadfsafsssssafasfsaf",function(err,object){
			if(err){
				throw err;
			}else{
				console.log(object);
			}
		});
		user.clean();
	}
});

user.init(function(err){
	if(err){
		throw err;
	}else{
		user.updateCurrentChance("ABee",3,function(err,object){
			if(err){
				throw err;
			}else{
				console.log(object);
			}
		});
		user.clean();
	}
});
