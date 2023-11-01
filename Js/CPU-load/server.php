<?php
$username = "cli";
$password = "12344321";
$url = "http://exercise.develop.maximaster.ru/service/cpu/";

$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($curl, CURLOPT_USERPWD, $username . ":" . $password);

$result = curl_exec($curl);

echo $result;