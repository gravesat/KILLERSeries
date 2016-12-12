<?php
    require("config.php");
    //we need config page for it to work//
    $submitted_username = '';
    //creating a variable to store a submitted username. when you get your password wrong, it stores the username//
    if(!empty($_POST)){
      //if information has been posted from the loggin form//
        $query
        //if the username doesnt exist itll come up with errors, matches usernames//
             = "
            SELECT
                id,
                username,
                password,
                salt,
                email
            FROM users
            WHERE
                username = :username
        ";
        $query_params = array(
          // array of variables, we're setting the inputted username to the real username, it matches it//
            ':username' => $_POST['username']
        );

        try{
            $stmt = $db->prepare($query);
            //this prepares the query to be sent to the data base//
            $result = $stmt->execute($query_params);
            //this adds the username to the sql (query) before it gets sent off//
        }
        catch(PDOException $ex){ die("Failed to run query: " . $ex->getMessage()); }
        //this will catch and display the error message//
        $login_ok = false;
        //tracks the state of log in whether its true or false//
        $row = $stmt->fetch();
        //fetches the record from the database of the user//
        if($row){
            $check_password = hash('sha256', $_POST['password'] . $row['salt']);
            //salt is added to the password and then hashed (encrypts)//
            for($round = 0; $round < 65536; $round++){
              //extra hashing 65536 times for extra security//
                $check_password = hash('sha256', $check_password . $row['salt']);
            }
            if($check_password === $row['password']){
                $login_ok = true;
                //happy for the user to logic//
            }
        }

        if($login_ok){
            unset($row['salt']);
            unset($row['password']);
            //salt and password hash gets removed allowing access and doesnt allow you to see it. removing it from being tracked//
            $_SESSION['user'] = $row;
            //logs you in to the secret page; your pages that you log in. Starts the session for the user//
            header("Location: secret.php");
            die("Redirecting to: secret.php");
        }
        else{
            print("Login Failed.");
            //says your password is wrong//
            $submitted_username = htmlentities($_POST['username'], ENT_QUOTES, 'UTF-8');
            //loads up original username and takes away wrong password//
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Jumbotron Template for Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">


    <!-- Custom styles for this template -->
    <link href="assets/css/jumbotron.css" rel="stylesheet">

       <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Project name</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="index.php">Home</a></li>
            <li><a href="register.php">Register</a></li>
          </ul>

          <form action="index.php" method="post" class="navbar-form navbar-right">
            <div class="form-group">
              <input type="text" name="username" class="form-control" value="<?php echo $submitted_username; ?>" />
            </div>
            <div class="form-group">
              <input type="password" name="password" value="" placeholder="Password" class="form-control">
            </div>
            <button type="submit" class="btn btn-success">Sign in</button>
          </form>
        </div><!--/.navbar-collapse -->
      </div>
    </nav>

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
      <div class="container">
        <h1>Hello, world!</h1>
        <p>This is a template for a simple marketing or informational website. It includes a large callout called a jumbotron and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
        <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more &raquo;</a></p>
      </div>
    </div>

    <div class="container">
      <!-- Example row of columns -->
      <div class="row">
        <div class="col-md-4">
          <h2>Heading</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
          <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div>
        <div class="col-md-4">
          <h2>Heading</h2>
          <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
          <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
       </div>
        <div class="col-md-4">
          <h2>Heading</h2>
          <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
          <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div>
      </div>

      <hr>

      <footer>
        <p>&copy; 2016 Company, Inc.</p>
      </footer>
    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
  </body>
</html>
