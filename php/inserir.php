<?php
  header('Access-Control-Allow-Methods: *');
  header('Access-Control-Allow-Origin: *');

  include('conecta.php');

  $nome = $_POST['nome'];
  $email = $_POST['email'];
  $endereco = $_POST['endereco'];
  $telefone = $_POST['telefone'];

  $sql = "INSERT INTO funcionarios (nome, email, endereco, telefone) VALUES ('$nome', '$email', '$endereco', '$telefone')";

  try {
    $query = $pdo->prepare($sql);
    $result = $query->execute();
  
  } catch (PDOException $e) {
    echo "Erro na inserção:".$e->getMessage();
  }
?>