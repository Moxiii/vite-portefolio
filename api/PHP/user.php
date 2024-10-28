<?php
// users.php
require 'db.php';
global $connection;
// Récupérer tous les utilisateurs
function getUsers($connection) {
    $query = "SELECT id, username FROM user";
    $stmt = $connection->query($query);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Récupérer un utilisateur par ID
function getUserById($connection, $userId) {
    $query = "SELECT id, username FROM user WHERE id = ?";
    $stmt = $connection->prepare($query);
    $stmt->execute([$userId]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// S'inscrire
function registerUser($connection, $username, $password) {
    // Vérifier si l'utilisateur existe déjà
    $query = "SELECT * FROM user WHERE username = ?";
    $stmt = $connection->prepare($query);
    $stmt->execute([$username]);
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingUser) {
        return ['error' => 'L\'utilisateur existe déjà.'];
    }

    // Hacher le mot de passe
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insérer l'utilisateur dans la base de données
    $query = "INSERT INTO user (username, password) VALUES (?, ?)";
    $stmt = $connection->prepare($query);
    $stmt->execute([$username, $hashedPassword]);

    return ['id' => $connection->lastInsertId(), 'username' => $username];
}

// Se connecter
function loginUser($connection, $username, $password) {
    // Vérifier si l'utilisateur existe
    $query = "SELECT * FROM user WHERE username = ?";
    $stmt = $connection->prepare($query);
    $stmt->execute([$username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        return ['error' => 'Nom d\'utilisateur ou mot de passe incorrect.'];
    }

    // Vérifier le mot de passe
    if (!password_verify($password, $user['password'])) {
        return ['error' => 'Nom d\'utilisateur ou mot de passe incorrect.'];
    }

    return ['message' => 'Connexion réussie', 'userId' => $user['id']];
}

// Supprimer un utilisateur
function deleteUser($connection, $userId) {
    $query = "DELETE FROM user WHERE id = ?";
    $stmt = $connection->prepare($query);
    $stmt->execute([$userId]);

    if ($stmt->rowCount() === 0) {
        return ['error' => 'Utilisateur non trouvé.'];
    }

    return ['message' => 'Utilisateur supprimé.'];
}

// Routes
header("Content-Type: application/json");
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Récupérer tous les utilisateurs
if (preg_match('/^\/api\/users\/?$/', $requestUri)) {
    if ($requestMethod === 'GET') {
        echo json_encode(getUsers($connection));
    } elseif ($requestMethod === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        $response = registerUser($connection, $username, $password);
        if (isset($response['error'])) {
            http_response_code(400);
            echo json_encode($response);
        } else {
            http_response_code(201);
            echo json_encode($response);
        }
    }
} elseif (preg_match('/^\/api\/users\/(\d+)$/', $requestUri, $matches)) {
    $userId = $matches[1];
    if ($requestMethod === 'GET') {
        $user = getUserById($connection, $userId);
        if ($user) {
            echo json_encode($user);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Utilisateur non trouvé.']);
        }
    } elseif ($requestMethod === 'DELETE') {
        $response = deleteUser($connection, $userId);
        if (isset($response['error'])) {
            http_response_code(404);
            echo json_encode($response);
        } else {
            echo json_encode($response);
        }
    }
} elseif (preg_match('/^\/api\/users\/login$/', $requestUri) && $requestMethod === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'] ?? null;
    $password = $data['password'] ?? null;

    $response = loginUser($connection, $username, $password);
    if (isset($response['error'])) {
        http_response_code(400);
        echo json_encode($response);
    } else {
        echo json_encode($response);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Route non trouvée.']);
}
