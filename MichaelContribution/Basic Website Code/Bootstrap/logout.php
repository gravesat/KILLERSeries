<?php 
    require("config.php"); //we need config page for it to work//
    unset($_SESSION['user']);/*ending the users session*/
    header("Location: index.php"); /*re-directing the user to the loggin page*/
    die("Redirecting to: index.php");/*re-directing the user to the loggin page*/
?>