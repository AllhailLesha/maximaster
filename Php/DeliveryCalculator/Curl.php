<?php

class Curl
{
    private $userName;
    private $password;
    private $url;

    public function __construct($userName, $password, $url)
    {
        $this->userName = $userName;
        $this->password = $password;
        $this->url = $url;
    }

    public function getUserName() {
        return $this->userName;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getUrl() {
        return $this->url;
    }

    public function setUserName($userName) {
        return $this->userName = $userName;
    }

    public function setPassword($password) {
        return $this->password = $password;
    }

    public function setUrl($url) {
        return $this->url = $url;
    }

    public function createCurlSetopt($url, $userName, $password) {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($curl, CURLOPT_USERPWD, $userName . ":" . $password);

        return $curl;
    }
}
?>