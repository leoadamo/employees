<?php

  function insereEmpregado($conexao, $array) {

    $sql = "INSERT INTO empregados (nome, email, endereco, telefone) VALUES (?, ?, ?, ?)";

    try {
      $query = $pdo->prepare($sql);
      $result = $query->execute($array);

      return $result;
    } catch (PDOException $e) {
      echo "Erro na inserção:".$e->getMessage();
    }
  }

  function listarEmpregados($conexao) {

    $sql = "SELECT * FROM empregados";

    try {
      $query = $pdo->prepare($sql);
      $query->exdcute();
      $result = $query->fetchAll();
      return $result;
    } catch (PDOException $e) {
      echo "Erro na listagem:".$e->getMessage();
    }
  }

  function buscarEmpregado($conexao, $array) {

    $sql = "SELECT * FROM empregados WHERE id = ?";

    try {
      $query = $pdo->prepare($sql);
      $query->execute($array);
      $result = $query->fecth();

      return $result ? $result : false;
    } catch (PDOException $e) {
      echo "Erro na busca:".$e->getMessage();
    }
  }

  function editarEmpregado($conexao, $array) {
    
    $sql = "UPDATE empregados SET nome = ?, email = ?, endereco = ?, telefone = ? WHERE id = ?";

    try {
      $query = $pdo->prepare($sql);
      $result = $query->execute($array);
      
      return $result;
    } catch (PDOException $e) {
      echo "Erro ao atualizar:".$e->getMessage();
    }
  }

  function excluiEmpregado($conexao, $array) {
    
    $sql = "DELETE FROM empregados WHERE id = ?";

    try {
      $query = $pdo->prepare($sql);
      $result = $query->execute($array);

      return $result;
    } catch (PDOException $e) {
      echo "Erro ao excluir:".$e->getMessage();
    }
  }
?>