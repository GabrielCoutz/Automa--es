<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercício 3</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <?php
        $media = ($_POST['nota1'] + $_POST['nota2'] + $_POST['nota3']) / 3;

        switch (true) {
          case $media < 6:
            $resultado = 'O aluno está Reprovado!';
            break;

          case $media == 6:
            $resultado = 'O aluno está em Recuperação!';
            break;
          
          default:
            $resultado = 'O aluno está Aprovado!';
            break;
        }
    ?>

</head>
<body>
  <div class="container h-100">

    <div class="row h-100 justify-content-center align-items-center">
      <div><a><?= $resultado; ?></a></div>
    </div>
    <a href="../../index.php" id='voltar'>Voltar</a>

  </div>
</body>
</html>