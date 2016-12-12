<?php

    // These variables define the connection information for your MySQL database
    $username = "michaelh_boot";
    $password = "Hewim004.306";
    $host = "localhost";
    $dbname = "michaelh_bootstrap";

    $options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
    try { $db = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8", $username, $password, $options); }
    //trying to connect to a database, using your username and password//
    catch(PDOException $ex){ die("Failed to connect to the database: " . $ex->getMessage());}
    //catches the error and displays the message//
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    header('Content-Type: text/html; charset=utf-8');
    //displays content in html if it needs to//
    session_start();
    //when you log into a session, you start logging into the database//
?>
