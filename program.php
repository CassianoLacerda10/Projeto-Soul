<?php 
require_once 'CSV.php';

if (isset($_FILES['csv'])) {
    $arquivoTemp = $_FILES['csv']['tmp_name'];
    $arquivoNome = $_FILES['csv']['name'];
    $delimitador = $_POST['delimitador'];

    // Defina um diretório onde você deseja salvar o arquivo CSV carregado
    $destino = "uploads/" . basename($arquivoNome);

    // Mova o arquivo carregado para o diretório de destino
    if (move_uploaded_file($arquivoTemp, $destino)) {
        try {
            $planilha = new readCSV($destino, $delimitador);
            $planilhaFormatada = $planilha->configCSV();
            echo $planilha->arrayToJSON($planilhaFormatada);
        } catch (Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => 'Falha ao mover o arquivo enviado.']);
    }
} else {
    echo json_encode(['error' => 'Arquivo não enviado.']);
}
?>
