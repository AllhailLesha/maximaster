<?php
use App\Models\Database;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

$app = AppFactory::create();

$app->get('/products', function (Request $request, Response $response) {
    $sql = "SELECT * FROM `products`";
    try {
        $database = new Database;
        $connection = $database->connectionDatabase();
        $stmt = $connection->query($sql);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $database = null;
        $response->getBody()->write(json_encode($products));
        return $response
            ->withHeader('content-type', 'application/json')
            ->withStatus(200);
    } catch(PDOException $exeption) {
        $error = array(
            "message"=> $exeption->getMessage(),
        );
        $response->getBody()->write((json_encode($error)));
        return $response
            ->withHeader('content-type', 'application/json')
            ->withStatus(500);
    }
});

$app->get('/products/{id}', function (Request $request, Response $response, array $args) {
    $id = $args['id'];
    $sql = "SELECT * FROM `products` WHERE id = $id";
    try {
        $database = new Database;
        $connection = $database->connectionDatabase();
        $stmt = $connection->query($sql);
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        $database = null;
        $response->getBody()->write(json_encode($product));
        return $response
            ->withHeader('content-type', 'application/json')
            ->withStatus(200);
    } catch(PDOException $exeption) {
        $error = array(
            "message"=> $exeption->getMessage(),
        );
        $response->getBody()->write((json_encode($error)));
        return $response
            ->withHeader('content-type', 'application/json')
            ->withStatus(500);
    }
});

$app->post('/products/add', function (Request $request, Response $response) {
    $parsedBody = $request->getParsedBody();
    $productName = $parsedBody['product_name'];
    $productPrice = $parsedBody['product_price'];
    $productDescription = $parsedBody['product_description'];
    $sql = "INSERT INTO `products` (`product_name`, `product_price`, `product_description`) VALUES (:product_name, :product_price, :product_description)";
    try {
        $database = new Database;
        $connection = $database->connectionDatabase();

        $stmt = $connection->prepare($sql);
        $stmt->bindParam(':product_name', $productName);
        $stmt->bindParam(':product_price', $productPrice);
        $stmt->bindParam(':product_description', $productDescription);

        $stmt->execute();

        $database = null;
        $response->getBody()->write(json_encode("Данные успешно добавленны в бд"));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(201);
    } catch(PDOException $exeption) {
        $error = array(
            "message"=> $exeption->getMessage(),
        );
        $response->getBody()->write((json_encode($error)));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(500);
    }
});

$app->put('/products/{id}', function (Request $request, Response $response, array $args) {
    $id = $args['id'];
    $rawData = $request->getBody()->getContents();
    $data = json_decode($rawData, true);
    $productName = $data['product_name'];
    $productPrice = $data['product_price'];
    $productDescription = $data['product_description'];
    $sql = "UPDATE `products` SET `product_name`='$productName', `product_price`='$productPrice', `product_description`='$productDescription' WHERE id = $id";
    try {
        $database = new Database;
        $connection = $database->connectionDatabase();

        $stmt = $connection->prepare($sql);
        $stmt->execute();

        $database = null;
        $response->getBody()->write(json_encode("Данные успешно обновлены"));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    } catch(PDOException $exeption) {
        $error = array(
            "message"=> $exeption->getMessage(),
        );
        $response->getBody()->write((json_encode($error)));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(500);
    }
});

$app->delete('/products/{id}', function (Request $request, Response $response, array $args) {
    $id = $args['id'];
    $sql = "DELETE FROM `products` WHERE id = $id";
    try {
        $database = new Database;
        $connection = $database->connectionDatabase();

        $stmt = $connection->query($sql);
        $result = $stmt->execute();

        $database = null;
        $response->getBody()->write(json_encode($result));
        return $response
            ->withHeader('content-type', 'application/json')
            ->withStatus(200);
    } catch(PDOException $exeption) {
        $error = array(
            "message"=> $exeption->getMessage(),
        );
        $response->getBody()->write((json_encode($error)));
        return $response
            ->withHeader('content-type', 'application/json')
            ->withStatus(500);
    }
});
