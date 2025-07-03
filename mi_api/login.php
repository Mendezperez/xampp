<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

$mysqli = new mysqli("localhost", "root", "", "empresa");

if ($mysqli->connect_errno) {
    echo json_encode(["success" => false, "message" => "Error de conexión"]);
    exit();
}

$email = $mysqli->real_escape_string($data->email);
$password = $data->password;

$query = "SELECT * FROM usuarios WHERE email = '$email'";
$result = $mysqli->query($query);

if ($result && $result->num_rows > 0) {
    $user = result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        echo json_encode(["success" => true, "username" => $user['username']]);
    } else {
        echo json_encode(["success" => false, "message" => "contraseña incorrecta"]);