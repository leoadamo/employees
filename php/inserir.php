<?php
  header('Access-Control-Allow-Methods: *');
  header('Access-Control-Allow-Origin: *');
  header('Content-type:application/json');

  include('conecta.php');

  $json = file_get_contents('php://input');
  $data = json_decode($json);

  $nome = $data->nome;
  $email = $data->email;
  $endereco = $data->endereco;
  $telefone = $data->telefone;
  $array = array($nome, $email, $endereco, $telefone);

  $sql = "INSERT INTO funcionarios (nome, email, endereco, telefone) VALUES (?, ?, ?, ?)";

  try {
    $query = $pdo->prepare($sql);
    $result = $query->execute($array);
  } catch (PDOException $e) {
    echo "Erro na inserção:".$e->getMessage();
  }
?>