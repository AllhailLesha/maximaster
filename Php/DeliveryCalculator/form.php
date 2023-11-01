<?php
include 'Curl.php';

header('Content-type: json/application');

$curl = new Curl("cli", "12344321", "http://exercise.develop.maximaster.ru/service/city/");

$curlSetops = $curl->createCurlSetopt($curl->getUrl(), $curl->getUserName(), $curl->getPassword());

$cacheFile = "text.txt";

function getLastCacheFileUpdate($cacheFile) {
    return date('d-m-Y', filemtime($cacheFile));
}

if (!file_get_contents($cacheFile)) {
    $result = curl_exec($curlSetops);
    file_put_contents($cacheFile, $result);
    echo json_encode(file_get_contents($cacheFile));
} if (getLastCacheFileUpdate($cacheFile) !== date("d-m-Y")) {
    $result = curl_exec($curlSetops);
    file_put_contents($cacheFile, "");
    file_put_contents($cacheFile, $result);
} 

echo file_get_contents($cacheFile);

curl_close($curlSetops);

