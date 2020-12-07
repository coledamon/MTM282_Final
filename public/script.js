const url = "http://localhost:4000/api";

fetch(url)
	.then(res => res.json())
	.then(people => {
		console.log(people);
	})