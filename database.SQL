CREATE TABLE "tasks" (
		"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
	"date" DATE,
	"complete" BOOLEAN
);

INSERT INTO "tasks" 
	("task", "date", "complete") 
VALUES 
	('clean car', '2021-10-10', 'false'), ('pick up house', '2021-10-10', 'false'), ('code stuff', '2021-10-10', 'false')
	;
