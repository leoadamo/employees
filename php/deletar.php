<?php
  header('Access-Control-Allow-Methods: *');
  header('Access-Control-Allow-Origin: *');
  
  include('conecta.php');

  $json = file_get_contents('php://input');
  $data = json_decode($json);
  $array = array($data);
  
  $sql = "DELETE FROM funcionarios WHERE id = ?";

  try {
    $query = $pdo->prepare($sql);
    $result = $query->execute($array);

  } catch (PDOException $e) {
    echo "Erro ao excluir:".$e->getMessage();
  }
?>