<?php
  header('Access-Control-Allow-Methods: *');
  header('Access-Control-Allow-Origin: *');
  
  include('conecta.php');

  $json = file_get_contents('php://input');
  $data = json_decode($json);
  $array = array($data);

  $sql = "SELECT * FROM funcionarios WHERE id = ?";

  try {
    $query = $pdo->prepare($sql);
    $result = $query->execute($array);
    $result = array();

    $info = $query->fetch(PDO::FETCH_ASSOC);
    array_push($result, $info);
    echo(json_encode($result));

  } catch (PDOException $e) {
    echo "Erro na busca:".$e->getMessage();
  }
?>