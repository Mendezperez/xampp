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

$username = $mysqli->real_escape_string($data->username);
$email = $mysqli->real_escape_string($data->email);
$password = password_hash($data->password, PASSWORD_DEFAULT);

$check = $mysqli->query("SELECT id FROM usuarios WHERE email = '$email'");
if ($check && $check->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Correo ya registrado."]);
    exit();
}

$query = "INSERT INTO usuarios (username, email, password) VALUES ('$username', '$email', '$password')";
if ($mysqli->query($query)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Error al registrar"]);
}
?>