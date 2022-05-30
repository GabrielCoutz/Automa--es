<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercício 3</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>
<body>
<div class="container h-100">
  <div class="row h-100 justify-content-center align-items-center">

    <form class="col-12" id='form' method="POST" action='assets/php/mostrar.php' onsubmit="return false">
      <div class="form-group">
        <label>Insira a Primeiro nota</label>
        <input type="number" class="form-control" name='nota1' id="nota1" placeholder="0 a 10" maxlength="2" onkeydown="this.value.match(/^[0-9]+$/)">
        <div class= 'alerta none'id='nota1Alert'></div>
      </div>

      <div class="form-group">
        <label>Insira a Segunda nota</label>
        <input type="number" class="form-control" name='nota2' id="nota2" placeholder="0 a 10" maxlength="2" onkeydown="this.value.match(/^[0-9]+$/)">
        <div class= 'alerta none'id='nota2Alert'></div>
      </div>

      <div class="form-group">
        <label>Insira a Terceira nota</label>
        <input type="number" class="form-control" name='nota3' id="nota3" placeholder="0 a 10" maxlength="2" onkeydown="this.value.match(/^[0-9]+$/)">
        <div class= 'alerta none'id='nota3Alert'></div>
      </div>
      <button type="submit" onclick="validar()">Enviar</button>
    </form>
  </div>

</div>
</body>
<script src="assets/js/script.js"></script>
</html>