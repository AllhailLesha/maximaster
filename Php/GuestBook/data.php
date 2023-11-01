<?php

$host = 'localhost';
$dbName = 'maximaster';
$userName = 'root';
$password = '';


$conn = new PDO("mysql:host=$host;dbname=$dbName", $userName, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

$data =$conn->query("SELECT name, date, message FROM `guest_book`")->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($data);