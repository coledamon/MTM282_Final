const url = "http://localhost:4000/api";

fetch(url)
	.then(res => res.json())
	.then(people => {
		console.log(people);
		//SETUP
		let canv1 = document.getElementById("question1");
		let canv2 = document.getElementById("question2");
		let canv3 = document.getElementById("question3");

		canv1.width = 200;
		canv2.width = 200;
		canv3.width = 200;

		let context1 = canv1.getContext("2d");
		let context2 = canv2.getContext("2d");
		let context3 = canv3.getContext("2d");

		//GRAPH 1

		q1bar1Height = 100*(people.question1.Cat/people.question1.total);
		q1bar2Height = 100*(people.question1.Dog/people.question1.total);
		q1bar3Height = 100*(people.question1.Other/people.question1.total);

		let grad = context1.createLinearGradient(0, 0, 0, 170);
		grad.addColorStop(0, "blue")
		grad.addColorStop(1, "red")
		context1.fillStyle = grad;
		// context1.fillStyle = "2a6";
		context1.fillRect(20, 150-q1bar1Height, 40, q1bar1Height);
		context1.fillRect(80, 150-q1bar2Height, 40, q1bar2Height);
		context1.fillRect(140, 150-q1bar3Height, 40, q1bar3Height);

		context1.fillStyle = "white";
		context1.font = "10px Arial";
		context1.fillText(`Cat-${people.question1.Cat}`, 26, 160-q1bar1Height - (q1bar1Height < 15 ? 15 : 0));
		context1.fillText(`Dog-${people.question1.Dog}`, 85, 160-q1bar2Height - (q1bar2Height < 15 ? 15 : 0));
		context1.fillText(`Other-${people.question1.Other}`, 140, 160-q1bar3Height - (q1bar3Height < 15 ? 15 : 0));

		context1.font = "20px Arial";
		context1.fillText("Best Pet To Have", 23, 30);


		//GRAPH 2


		context2.fillStyle = grad;
		// context2.fillStyle = "#2a6";
		q2bar1Height = 100*(people.question2.Console/people.question2.total);
		q2bar2Height = 100*(people.question2.PC/people.question2.total);

		context2.fillRect(25, 150-q2bar1Height, 60, q2bar1Height);
		context2.fillRect(115, 150-q2bar2Height, 60, q2bar2Height);

		context2.fillStyle = "white";
		context2.font = "10px Arial";
		context2.fillText(`Console-${people.question2.Console}`, 27, 160-q2bar1Height - (q2bar1Height < 15 ? 15 : 0));
		context2.fillText(`PC-${people.question2.PC}`, 130, 160-q2bar2Height - (q2bar2Height < 15 ? 15 : 0));

		context2.font = "20px Arial";
		context2.fillText("PC vs. Console", 30, 30);


		//GRAPH 3

		
		context3.fillStyle = grad;
		// context3.fillStyle = "#2a6";
		q3bar1Height = 100*(people.question3.Left/people.question3.total);
		q3bar2Height = 100*(people.question3.Right/people.question3.total);

		context3.fillRect(30, 150-q3bar1Height, 50, q3bar1Height);
		context3.fillRect(120, 150-q3bar2Height, 50, q3bar2Height);

		context3.fillStyle = "white";
		context3.font = "10px Arial";
		context3.fillText(`Left-${people.question3.Left}`, 40, 160-q3bar1Height - (q3bar1Height < 15 ? 15 : 0));
		context3.fillText(`Right-${people.question3.Right}`, 125, 160-q3bar2Height - (q3bar2Height < 15 ? 15 : 0));

		context3.font = "20px Arial";
		context3.fillText("Handedness", 42, 30);

	})