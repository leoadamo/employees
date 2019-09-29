<?php
  header('Access-Control-Allow-Methods: *');
  header('Access-Control-Allow-Origin: *');
  
  include('conecta.php');

  $nome = $_POST['nome'];
  $email = $_POST['email'];
  $endereco = $_POST['endereco'];
  $telefone = $_POST['telefone'];
  $id = ['id'];
  $sql = "UPDATE funcionarios SET nome = '$nome', email = '$email', endereco = '$endereco', telefone = '$telefone' WHERE id = '$id'";

  try {
    $query = $pdo->prepare($sql);
    $result = $query->execute();
    
  } catch (PDOException $e) {
    echo "Erro ao atualizar:".$e->getMessage();
  }
?>