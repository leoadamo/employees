<?php
  header('Access-Control-Allow-Methods: *');
  header('Access-Control-Allow-Origin: *');
  
  include('conecta.php');

  $sql = "SELECT * FROM funcionarios";

  try {
    $query = $pdo->prepare($sql);
    $query->execute();
    $result = array();

    while($info = $query->fetch(PDO::FETCH_ASSOC)) {
      array_push($result, $info);
    }
    echo(json_encode($result));
    
  } catch (PDOException $e) {
    echo "Erro na listagem:".$e->getMessage();
  }
?>