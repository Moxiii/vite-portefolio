<?php
// index.php
require './PHP/db.php'; // Inclure le fichier de connexion à la base de données
require './PHP/users.php'; // Inclure le fichier des utilisateurs
require './PHP/projects.php'; // Inclure le fichier des projets

// Middleware pour gérer les erreurs
function error_handler($http_code, $message) {
    http_response_code($http_code);
    echo json_encode(['error' => $message]);
    exit();
}

// Exemple d'usage pour rediriger les requêtes selon les routes
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

// Redirection vers les fichiers appropriés
if (preg_match('/^\/api\/users/', $requestUri)) {
    require 'users.php';
} elseif (preg_match('/^\/api\/projects/', $requestUri)) {
    require 'projects.php';
} else {
    error_handler(404, 'Route non trouvée.');
}
