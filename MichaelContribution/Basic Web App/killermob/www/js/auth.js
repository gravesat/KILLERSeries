$(document).ready(function(){
	var url="http://www.michaelhewins.co.uk/phonegap/auth.php?callback=?";/*links to our server (the php file)*/
    
    //Login Function
    $("#login").click(function(){
        /*click to login*/

    	var email=$("#email").val();
    	var password=$("#password").val();/*checking if the email already exists in the database*/
    	var dataString="email="+email+"&password="+password+"&login=";
    	if($.trim(email).length>0 & $.trim(password).length>0)/*formats the email and password. Making sure the format has been typed in*/
		{
			$.ajax({
				type: "POST",/*posting and sending the information using the post method*/
				url: url,/*connecting to the url, this is the url on line 2*/
				data: dataString,/*the data we're sending(check above line 10)*/
				crossDomain: true, /*allows it to go from one server to another*/
				cache: false,
				beforeSend: function(){ $("#login").html('Connecting...');},/*changes the text on the button to connecting*/
				success: function(data){/*returned information from the server*/
					if(data=="success")
					{
						localStorage.login="true";/*if the login is correct, it is set as true*/
						localStorage.email=email;
						window.location.href = "index.html";/*this is the unlocked secret page unlocked*/
					}
					else if(data="failed")
					{
						alert("Login error");
						$("#login").html('Login');/*when it connects, it'll switch it back to the login page*/
					}
				}
			});
		}return false;/*just tells it to return no information*/

    });

    //signup function
    $("#signup").click(function(){
    	var fullname=$("#fullname").val();
    	var email=$("#email").val();
    	var password=$("#password").val();
    	var dataString="fullname="+fullname+"&email="+email+"&password="+password+"&signup=";

    	if($.trim(fullname).length>0 & $.trim(email).length>0 & $.trim(password).length>0)
		{
			$.ajax({
				type: "POST",/*posting and sending the information using the post method*/
				url: url,/*connecting to the url, this is the url on line 2*/
				data: dataString,/*the data we're sending(check above line 10)*/
				crossDomain: true,/*allows it to go from one server to another*/
				cache: false,
				beforeSend: function(){ $("#signup").val('Connecting...');},/*changes the text on the button to connecting*/
				success: function(data){/*returned information from the server*/
					if(data=="success")
					{
						alert("Thank you for Registering with us! you can login now");
					}
					else if(data="exist")
					{
						alert("Hey! You alreay has account! you can login with us");
					}
					else if(data="failed")
					{
						alert("Something Went wrong");
					}
				}
			});
		}return false;

    });

    //Change Password
    $("#change_password").click(function(){
    	var email=localStorage.email;
    	var old_password=$("#old_password").val();
    	var new_password=$("#new_password").val();
    	var dataString="old_password="+old_password+"&new_password="+new_password+"&email="+email+"&change_password=";
    	if($.trim(old_password).length>0 & $.trim(old_password).length>0)
		{
			$.ajax({
				type: "POST",/*posting and sending the information using the post method*/
				url: url,/*connecting to the url, this is the url on line 2*/
				data: dataString,/*the data we're sending(check above line 10)*/
				crossDomain: true,/*allows it to go from one server to another*/
				cache: false,
				beforeSend: function(){ $("#change_password").val('Connecting...');},
				success: function(data){/*returned information from the server*/
					if(data=="incorrect")
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
				type: "POST",/*posting and sending the information using the post method*/
				url: url,/*connecting to the url, this is the url on line 2*/
				data: dataString,/*the data we're sending(check above line 10)*/
				crossDomain: true,/*allows it to go from one server to another*/
				cache: false,
				beforeSend: function(){ $("#forget_password").val('Connecting...');},
				success: function(data){/*returned information from the server*/
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
    $("#logout").click(function(){
    	localStorage.login="false";/*logging them out*/
    	window.location.href = "login.html";/*redirecting back to login page*/
    });

    //Displaying user email on home page
    $("#email1").html(localStorage.email);
    var imageHash="http://www.gravatar.com/avatar/"+md5(localStorage.email);
    $("#profilepic").attr('src',imageHash);
});
