<?php
require 'db.php';
global $connection;

function getProjects($connection)
{
    $query = "
        SELECT p.id, p.title, p.description,
               i.src AS image_src, i.isMock AS image_isMock, i.title AS image_title
        FROM projects p
        LEFT JOIN images i ON p.id = i.project_id
        WHERE i.isMock = 1
    ";

    $stmt = $connection->query($query);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $projects = [];
    foreach ($results as $row) {
        // Création ou mise à jour du projet
        if (!isset($projects[$row['id']])) {
            $projects[$row['id']] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'description' => $row['description'],
                'img' => []
            ];
        }

        // Ajout de l'image à la liste d'images du projet
        $projects[$row['id']]['img'][] = [
            'isMock' => $row['image_isMock'],
            'src' => $row['image_src'],
            'title' => $row['image_title'],
        ];
    }

    return array_values($projects); // Retourner un tableau indexé
}

function getProjectById($connection, $projectId)
{
    $query = "
        SELECT p.id, p.title, p.presentation, p.fini, p.deploy,
               i.src AS image_src, i.isMock AS image_isMock, i.title AS image_title,
               l.name AS link_name, l.url AS link_url,
               t.name AS tech_name, t.icon AS tech_icon
        FROM projects p
        LEFT JOIN images i ON p.id = i.project_id AND i.isMock = 0
        LEFT JOIN links l ON p.id = l.project_id
        LEFT JOIN technos t ON p.id = t.project_id
        WHERE p.id = :id
    ";

    $stmt = $connection->prepare($query);
    $stmt->bindParam(':id', $projectId, PDO::PARAM_INT);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($results)) {
        return null; // Projet non trouvé
    }

    $project = [
        'title' => $results[0]['title'],
        'presentation' => json_decode($results[0]['presentation']),
        'links' => [],
        'img' => [],
        'technologies' => [],
        'fini' => $results[0]['fini'],
        'deploy' => $results[0]['deploy'],
    ];

    foreach ($results as $row) {
        // Ajout des liens
        if ($row['link_name'] && $row['link_url']) {
            $project['links'][] = [
                'name' => $row['link_name'],
                'url' => $row['link_url']
            ];
        }

        // Ajout des images
        if ($row['image_src']) {
            $project['img'][] = [
                'src' => $row['image_src'],
                'title' => $row['image_title']
            ];
        }

        // Ajout des technologies
        if ($row['tech_name'] && $row['tech_icon']) {
            $project['technologies'][] = [
                'name' => $row['tech_name'],
                'icon' => $row['tech_icon']
            ];
        }
    }

    return $project;
}


function insertProject($connection, $data)
{
    $query = "INSERT INTO projects (title, description, presentation, fini, deploy) VALUES (:title, :description, :presentation, :fini, :deploy)";
    $stmt = $connection->prepare($query);
    $stmt->execute($data);
    return $connection->lastInsertId();
}


function updateProject($connection, $projectId, $data)
{
    $updates = [];
    foreach ($data as $key => $value) {
        if ($value !== null) {
            $updates[] = "$key = :$key";
        }
    }
    $query = "UPDATE projects SET " . implode(', ', $updates) . " WHERE id = :id";
    $stmt = $connection->prepare($query);
    $data['id'] = $projectId; // Ajouter l'ID au tableau des données
    $stmt->execute($data);
}


function deleteProject($connection, $projectId)
{

    $connection->prepare("DELETE FROM links WHERE project_id = :id")->execute([':id' => $projectId]);
    $connection->prepare("DELETE FROM images WHERE project_id = :id")->execute([':id' => $projectId]);

    $stmt = $connection->prepare("DELETE FROM projects WHERE id = :id");
    $stmt->execute([':id' => $projectId]);
}


header("Content-Type: application/json");
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];

if (preg_match('/^\/api\/projects\/?$/', $requestUri)) {
    if ($requestMethod === 'GET') {
        echo json_encode(getProjects($connection));
    } elseif ($requestMethod === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $projectId = insertProject($connection, $data);
        echo json_encode(['id' => $projectId]);
    }
} elseif (preg_match('/^\/api\/projects\/(\d+)$/', $requestUri, $matches)) {
    $projectId = $matches[1];
    if ($requestMethod === 'GET') {
        $project = getProjectById($connection, $projectId);
        if ($project) {
            echo json_encode($project);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Projet non trouvé']);
        }
    } elseif ($requestMethod === 'PUT') {
        $data = json_decode(file_get_contents('php://input'), true);
        updateProject($connection, $projectId, $data);
        echo json_encode(['message' => 'Projet mis à jour']);
    } elseif ($requestMethod === 'DELETE') {
        deleteProject($connection, $projectId);
        echo json_encode(['message' => 'Projet supprimé']);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Route non trouvée']);
}
