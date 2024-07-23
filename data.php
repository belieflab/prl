<?php
// Ensure the response is treated as JSON
header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

// Get the POST data
$post_data = json_decode(file_get_contents('php://input'), true);

if ($post_data !== null) {
    $name = "data/" . $post_data['filename'] . ".csv";
    $data = $post_data['filedata'];

    // Ensure the directory exists
    $directory = dirname($name);
    // if (!is_dir($directory)) {
    //     mkdir($directory, 0755, true);
    // }

    // Attempt to save the file
    if (file_put_contents($name, $data) !== false) {
        $response['success'] = true;
        $response['message'] = 'File saved successfully';
    } else {
        $response['message'] = 'Failed to save file';
    }
} else {
    $response['message'] = 'Invalid input data';
}

// Send the JSON response back to the client
echo json_encode($response);
?>
