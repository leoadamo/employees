<?php
  header('Access-Control-Allow-Methods: *');
  header('Access-Control-Allow-Origin: *');

  include('conecta.php');

  $json = file_get_contents('php://input');
  $data = json_decode($json);

  $nome = $data->nome;
  $email = $data->email;
  $endereco = $data->endereco;
  $telefone = $data->telefone;
  $id = $data->id;
  $array = array($nome, $email, $endereco, $telefone, $id);

  $sql = "UPDATE funcionarios SET nome = ?, email = ?, endereco = ?, telefone = ? WHERE id = ?";

  try {
    $query = $pdo->prepare($sql);
    $result = $query->execute($array);
  } catch (PDOException $e) {
    echo "Erro ao atualizar:".$e->getMessage();
  }
?>