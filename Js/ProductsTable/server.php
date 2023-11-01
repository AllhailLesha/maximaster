<?php

$url = 'http://exercise.develop.maximaster.ru/service/products/';
$userName = 'cli';
$password = '12344321';


try {
    $curl = curl_init();

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($curl, CURLOPT_USERPWD, $userName . ':' . $password);

    $response = curl_exec($curl);

    curl_close($curl);

    echo $response;
} catch (error) {
    throw new Error();
}
 
