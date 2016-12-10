$(document).ready(function(){
	var url="http://www.talarthurmedia.co.uk/phonegap/auth.php?callback=?"; //address of the .php file

    //Login Function
    $("#login").click(function(){ //when the login button is clicked, it will trigger the code below

    	var email=$("#email").val(); //takes the value
    	var password=$("#password").val(); //takes the value
    	var dataString="email="+email+"&password="+password+"&login="; //moves the values into a single string
    	if($.trim(email).length>0 & $.trim(password).length>0) //formats the email and password - makes sure the form has been entered
		{
			$.ajax({ //library inside of javascript that allows you to connect to servers
				type: "POST", //sends info using the post method to the link above
				url: url, //connect to URL
				data: dataString, //sends the datastring
				crossDomain: true, //allows it to go to another server with different domains
				cache: false,
				beforeSend: function(){ $("#login").html('Connecting...');}, //once 'login' button is pressed, it sends info and changes the text on the button to connecting
				success: function(data){ //if successful the data will returned
					if(data=="success") //if the login is correct, the login will be set to true
					{
						localStorage.login="true"; //stores the fact that theyre logged in
						localStorage.email=email; //stores the email they used to log in
						window.location.href = "index.html"; //logs user in and shows them the hidden index.html page
					}
					else if(data="failed") //the login fails to login
					{
						alert("Login error"); //displays a message/alert to user saying the login has failed
						$("#login").html('Login'); //reverts the button that said 'connecting' back to login
					}
				}
			});
		}return false; //returns no information

    });

    //signup function
    $("#signup").click(function(){ //when the signup button is clicked, it will trigger the code below
    	var fullname=$("#fullname").val(); //takes the value
    	var email=$("#email").val(); //takes the value
    	var password=$("#password").val(); //takes the value
    	var dataString="fullname="+fullname+"&email="+email+"&password="+password+"&signup="; //moves the values into a single string

    	if($.trim(fullname).length>0 & $.trim(email).length>0 & $.trim(password).length>0) //formats the full name, email and password - makes sure the form has been entered
		{
			$.ajax({ //library inside of javascript that allows you to connect to servers
				type: "POST", //sends info using the post method to the link above
				url: url, //connect to URL
				data: dataString, //sends the datastring
				crossDomain: true, //allows it to go to another server with different domains
				cache: false,
				beforeSend: function(){ $("#signup").val('Connecting...');}, //once 'signup' button is pressed, it sends info and changes the text on the button to connecting
				success: function(data){ //if successful the data will returned
					if(data=="success")
					{
						alert("Thank you for Registering with us! you can login now"); //if successful a message/alert will pop up
					}
					else if(data="exist") //the inputted data has already been registered
					{
						alert("Hey! You alreay has account! you can login with us"); //message displayed
					}
					else if(data="failed") //registering failed
					{
						alert("Something Went wrong"); //message displayed when register fails
					}
				}
			});
		}return false; //returns no information

    });

    //Change Password
    $("#change_password").click(function(){ //when the change password button is clicked, it will trigger the code below
    	var email=localStorage.email; //storing the email in localStorage so it can display it later
    	var old_password=$("#old_password").val(); //takes the value
    	var new_password=$("#new_password").val(); //takes the value
    	var dataString="old_password="+old_password+"&new_password="+new_password+"&email="+email+"&change_password="; //moves the values into a single string
    	if($.trim(old_password).length>0 & $.trim(old_password).length>0) //formats the full name, email and password - makes sure the form has been entered
		{
			$.ajax({ //library inside of javascript that allows you to connect to servers
				type: "POST", //sends info using the post method to the link above
				url: url, //connect to URL
				data: dataString, //sends the datastring
				crossDomain: true, //allows it to go to another server with different domains
				cache: false,
				beforeSend: function(){ $("#change_password").val('Connecting...');}, //once 'change_password' button is pressed, it sends info and changes the text on the button to connecting
				success: function(data){ //if successful the data will returned
					if(data=="incorrect") //incorrect

					{
						alert("Your old password is incorrect");
					}
					else if(data="success")
					{
						alert("Password Changed successfully");
					}
					else if(data="failed")
					{
						alert("Something Went wrong");
					}
				}
			});
		}return false;

    });

    //Forget Password
    $("#forget_password").click(function(){
    	var email=$("#email").val();
    	var dataString="email="+email+"&forget_password=";
    	if($.trim(email).length>0)
		{
			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){ $("#forget_password").val('Connecting...');},
				success: function(data){
					if(data=="invalid")
					{
						alert("Your have not registered with us");
					}
					else if(data="success")
					{
						alert("we have sent password to your email address, please check");
					}
				}
			});
		}return false;

    });


    //logout function
    $("#logout").click(function(){ //when the logout button is clicked the code below initiates
    	localStorage.login="false"; //logs the user out
    	window.location.href = "login.html"; //redirects them to the login page
    });

    //Displaying user email on home page
    $("#email1").html(localStorage.email);
    var imageHash="http://www.gravatar.com/avatar/"+md5(localStorage.email);
    $("#profilepic").attr('src',imageHash);
});
