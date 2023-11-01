<?php
namespace App\Models;

use \PDO;

class Database
{
    private $host = 'localhost';
    private $dbName = 'maximaster';
    private $userName = 'root';
    private $password = '';

    public function connectionDatabase() {
        $connection = new PDO("mysql:host=$this->host;dbname=$this->dbName", $this->userName, $this->password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        return $connection;
    }
}