var question1 = {
	"_id" : "1",
	"position" : {
		"latitude" : "43.616323",
		"longitude" : "7.07355"
	},
	"question" : "What is the name of this place?",
	"type" : "essay",
	"answers" : [
		"polytech nice sophia",
		"polytech nice-sophia",
		"polytech nice",
		"universitaire nice sophia",
		"universitaire nice sophia antipolis"
	],
	"choices" : null,
	"first_create_time" : new Date(),
	"last_modified_time" : new Date(),
	"comments" : [],
	"photo_path" : "question1.png",
	"next_question" : "2"


};

var question2 = {
	"_id" : "2",
	"position" : {
		"latitude" : "43.614383",
		"longitude" : "7.073028"
	},
	"question" : "There are how many places in the parking?",
	"type" : "single-choice",
	"answers" : [
		"D.212"
	],
	"choices" : [
		"A.155",
		"B.178",
		"C.194",
		"D.212",
		"E.235",
		"F.267"
	],
	"first_create_time" : new Date(),
	"last_modified_time" : new Date(),
	"comments" : [ ],
	"photo_path" : "question2.png",
	"next_question" : "3"
}

var question3 = {
	"_id" : "3",
	"position" : {
		"latitude" : "43.615463",
		"longitude" : "7.071821"
	},
	"question" : "The teachers' office is in which floor?",
	"type" : "single-choice",
	"answers" : [
		"D.Fourth"
	],
	"choices" : [
		"A.First",
		"B.Second",
		"C.Third",
		"D.Fourth"
	],
	"first_create_time" : new Date(),
	"last_modified_time" : new Date(),
	"comments" : [],
	"photo_path" : "question3.png",
	"next_question" : "4"

}

var question4 = {
	"_id" : "4",
	"position" : {
		"latitude" : "43.616716",
		"longitude" : "7.074028"
	},
	"question" : "How long the green traffic light lasts (seconds)?",
	"type" : "essay",
	"answers" : [
		"10",
		"ten",
		"dix",
		"10 seconds",
		"ten seconds",
		"dix seconds"
	],
	"choices" : null,
	"first_create_time" : new Date(),
	"last_modified_time" : new Date(),
	"comments" : [],
	"photo_path" : "question4.png",
	"next_question" : "5"

}

var question5 = {
	"_id" : "5",
	"position" : {
		"latitude" : "43.617856",
		"longitude" : "7.075281"
	},
	"question" : "What is the price of a small plastic bag (euro)?",
	"type" : "essay",
	"answers" : [
		"0.12",
		"0,12"
	],
	"choices" : null,
	"first_create_time" : new Date(),
	"last_modified_time" : new Date(),
	"comments" : [ ],
	"photo_path" : "question5.png",
	"next_question" : "6"

}

var question6 = {
	"_id" : "6",
	"position" : {
		"latitude" : "43.618065",
		"longitude" : "7.076229"
	},
	"question" : "Which of the following places are not exists here?",
	"type" : "multi-choice",
	"answers" : [
		"C.gas station",
		"E.bank",
		"G.kindergarden"
	],
	"choices" : [
		"A.restaurant",
		"B.pharmacy",
		"C.gas station",
		"D.post office",
		"E.bank",
		"F.supermarket",
		"G.kindergarden",
		"H.residence",
		"I.tabac",
		"police office"
	],
	"first_create_time" : new Date(),
	"last_modified_time" : new Date(),
	"comments" : [ ],
	"photo_path" : "question6.png",
	"next_question" : "7"

}

db.questions.insert(question1);
db.questions.insert(question2);
db.questions.insert(question3);
db.questions.insert(question4);
db.questions.insert(question5);
db.questions.insert(question6);
