<?php
  header('Access-Control-Allow-Methods: *');
  header('Access-Control-Allow-Origin: *');
  
  include('conecta.php');

  $id = $_POST['id'];
  $sql = "SELECT * FROM funcionarios WHERE id = '$id'";

  try {
    $query = $pdo->prepare($sql);
    $query->execute();
    $result = $query->fecth();

    echo(json_encode($result));

  } catch (PDOException $e) {
    echo "Erro na busca:".$e->getMessage();
  }
?>