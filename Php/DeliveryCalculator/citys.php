<?php
include 'Curl.php';

$city = $_POST['citys'];
$weight = $_POST['weight'];

$curl = new Curl("cli", "12344321", "http://exercise.develop.maximaster.ru/service/delivery/?city=$city&weight=$weight");

$curlSetopt = $curl->createCurlSetopt($curl->getUrl(), $curl->getUserName(), $curl->getPassword());

$result = curl_exec($curlSetopt);

curl_close($curlSetopt);

echo $result;