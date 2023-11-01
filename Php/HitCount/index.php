<?php
    $connection = new PDO('mysql:host=localhost;port=3306;dbname=maximaster;charset=utf8', 'root', '');

    $connection->query("UPDATE hit_count SET number_of_visit = number_of_visit + 1 WHERE id = 1");
    $numberOfVisits = $connection->query("SELECT number_of_visit FROM `hit_count`")->fetchAll(PDO::FETCH_ASSOC);

    $data = date('H:i');
    foreach ($numberOfVisits as $numberOfVisit) {
        echo '<div style=>';
        echo "Страница была загружена {$numberOfVisit['number_of_visit']} раз. Текущее время $data.";
        echo '</div';
    }
?>
