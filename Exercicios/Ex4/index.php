<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercício 4</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>
<div class="container h-100">
  <div class="row h-100 justify-content-center align-items-center">

    <form class="col-12" id='form' method="POST" action='assets/php/mostrar.php' onsubmit="return false">
      <div class="form-group">
        <label>Selecione sua idade</label>
        <input type="range" class="form-control" name='num' id="num" min='0' max='100' value='0' oninput="this.nextElementSibling.value = this.value+' Anos'"><output></output>
        <div class= 'alerta none'id='numAlert'></div>
      </div>

      <button type="submit" onclick="validar()">Enviar</button>
    </form>
  </div>

</div>
</body>
<script src="assets/js/script.js"></script>
</html>
