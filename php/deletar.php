<?php
  header('Access-Control-Allow-Methods: *');
  header('Access-Control-Allow-Origin: *');
  
  include('conecta.php');
  
  $id = $_POST['id'];
  $sql = "DELETE FROM funcionarios WHERE id = '$id'";

  try {
    $query = $pdo->prepare($sql);
    $result = $query->execute();

  } catch (PDOException $e) {
    echo "Erro ao excluir:".$e->getMessage();
  }
?>