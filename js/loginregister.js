$(function() {
	//Login
	var loginBtn = document.getElementById("loginButton");

	loginBtn.addEventListener("click", function(e) {
		e.preventDefault();
		login($("#loginUsername").val(), $("#loginPassword").val(), $("#loginEmail"));
	}, false);


	function login(username, password, email) {
		var reqBody = {
			"username": username,
			"password": password,
		}
		$.ajax({
				url: "https://auth.afforest89.hasura-app.io/login",
				beforeSend: function(xhrObj) {
					xhrObj.setRequestHeader("Content-Type", "application/json");
				},
				type: "POST",
				data: JSON.stringify(reqBody),
			})
			.done(function(data) {
				sessionStorage.setItem('Authorization', data.auth_token);
				//Are we a teacher or student? huh?
				
				var b = 
				{
					
			    "type" : "select",
			    "args" :
			    	{
			    	    "table" : "user_types",
			    	    "columns": ["user_type"],
			    	    "where": {"user_id": data.hasura_id}
			    	}
					
				}
				
				$.ajax({
					url: "https://data.afforest89.hasura-app.io/v1/query",
					beforeSend: function(xhrObj) {
						xhrObj.setRequestHeader("Content-Type", "application/json");
						xhrObj.setRequestHeader("Authorization", "Bearer " + data.auth_token);
					},
					type: "POST",
					data: JSON.stringify(b),
					})
					.done(function(data)
					{
						if(data[0].user_type == 0) window.location = "dashboard.html";
						else window.location = "student-dashboard.html";
						
					});
				
				
			})
			.fail(function() {
				alert("Error. Please Enter A Valid Username & Password Combination");
			});
	};

	//Signup
	var signupBtn = document.getElementById("signupButton");
	signupBtn.addEventListener("click", function(e) {
		e.preventDefault();
		var teacherStudent = $('#teacherStudent').val();
		teacherStudent = (teacherStudent == 0) ? "student" : "teacher"
		console.log(teacherStudent);
		signup($("#signupFirstName").val(), $("#signupLastName").val(), $("#signupEmail").val(), $("#signupPassword").val(), teacherStudent);
	}, false);



	function signup(firstname, lastname, username, password, teacherStudent) {
		var reqBody = {
			"username": username,
			"password": password,
		}
		$.ajax({
				url: "https://auth.afforest89.hasura-app.io/signup",
				beforeSend: function(xhrObj) {
					xhrObj.setRequestHeader("Content-Type", "application/json");
				},
				type: "POST",
				data: JSON.stringify(reqBody),
			})
			.done(function(data) {
				console.log(data);
				sessionStorage.setItem('Authorization', data.auth_token);
				var id = data.hasura_id;
				var t;
				//window.location = (teacherStudent == "teacher") ? "dashboard.html" : "student-dashboard.html";
				t = teacherStudent == "teacher" ? 0 : 1;

				var b =
				{
					"type": "insert",
					"args":
					{
						"table": "user_types",
						"objects": [{
							"user_id": id,
							"user_type": t,
						}]
					}
				};
		
				$.ajax({
					url: "https://data.afforest89.hasura-app.io/v1/query",
					beforeSend: function(xhrObj) {
						xhrObj.setRequestHeader("Content-Type", "application/json");
						xhrObj.setRequestHeader("Authorization", "Bearer " + data.auth_token);
					},
					type: "POST",
					data: JSON.stringify(b),
					})
					.done(function(data) {console.log('success');});

			})
			.fail(function() {
				alert("Error. Please Enter A Password Of At Least 8 Characters");
			});
	};
});