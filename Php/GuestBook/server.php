<?php
    $name = $_POST['guestName'];
    $message = $_POST['message'];
    if (!empty($name) && !empty($message)) {
        $host = 'localhost';
        $dbName = 'maximaster';
        $userName = 'root';
        $password = '';
    
        $date = date("d.m.Y H:i");
    
        $conn = new PDO("mysql:host=$host;dbname=$dbName", $userName, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    
        $sql = "INSERT INTO guest_book (name, date ,message) VALUES(?, ?, ?)";
    
        $stmt = $conn->prepare($sql);
        $stmt->execute([$name, $date, $message]);
    }
    



