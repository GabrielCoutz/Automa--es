<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercício 1</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <?php
        $num1 = $_POST['num1'];
        $num2 = $_POST['num2'];

        $resultado = $num1 == $num2 ? 'Os números são iguais!' : 'Os números são diferentes!';
        // condição ? true : false
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