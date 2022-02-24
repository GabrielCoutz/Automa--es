<!DOCTYPE html>
 <html lang="pt-BR">
 
 <head>
     <meta charset="utf-8" />
     <link rel="apple-touch-icon" sizes="76x76" href="assets/img/apple-icon.png">
     <link rel="icon" type="image/png" href="../assets/img/favicon/favicon.ico">
     <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
     <title>Light Bootstrap Dashboard - Free Bootstrap 4 Admin Dashboard by Creative Tim</title>
     <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
     <!--     Fonts and icons     -->
     <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
     <!-- CSS Files -->
     <link href="assets/css/bootstrap.min.css" rel="stylesheet" />
     <link href="assets/css/light-bootstrap-dashboard.css?v=2.0.0 " rel="stylesheet" />
     <!-- CSS Just for demo purpose, don't include it in your project -->
     <link href="assets/css/demo.css" rel="stylesheet" />

     <?php
     error_reporting(E_ERROR | E_PARSE);
     session_start();

     if(!isset($_SESSION['email']) && !strpos($protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],md5('erro=true'))){
       header("Refresh:0; url=projeto.php".'?'.md5('erro=true'));
       exit;
     } else {
       $email=$_SESSION['email'];
     }

     ?>
 </head>
 
 <body>
     <div class="wrapper">
         <div class="sidebar" data-image="assets/img/sidebar-6.jpg">
             <div class="sidebar-wrapper">
                 
                 <ul class="nav">
                     
                     <li>
                         <a class="nav-link" href="../usuario.php">
                             <i class="nc-icon nc-circle-09"></i>
                             <p>Perfil do Usuário</p>
                         </a>
                     </li>
                     <li>
                         <a class="nav-link" href="../PerfilEmpresa/empresa.php">
                             <i class="nc-icon nc-chart-bar-32"></i>
                             <p>Perfil da Empresa</p>
                         </a>
                     </li>
                     <li>
                         <a class="nav-link" href="">
                             <i class="nc-icon nc-bulb-63"></i>
                             <p>Andamento do Projeto</p>
                         </a>
                     </li>
                 </ul>
             </div>
         </div>
         <div class="main-panel">
             <!-- Navbar -->
             <nav class="navbar navbar-expand-lg " color-on-scroll="500">
                 <div class="container-fluid">
                     <a class="navbar-brand" href="#pablo"> Projeto </a>
                     <button href="" class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                         <span class="navbar-toggler-bar burger-lines"></span>
                         <span class="navbar-toggler-bar burger-lines"></span>
                         <span class="navbar-toggler-bar burger-lines"></span>
                     </button>
                     <div class="collapse navbar-collapse justify-content-end" id="navigation">
                        <ul class="nav navbar-nav mr-auto">
                            <li class="nav-item">
                                <a href="#" class="nav-link" data-toggle="dropdown">
                                    <i class="nc-icon nc-palette"></i>
                                    <span class="d-lg-none">Dashboard</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" onclick="sair()">
                                    <span class="no-icon" id='btnsair'>Sair</span>
                                </a>
                            </li>
                        </ul>
                    </div>
             </nav>
             <!-- End Navbar -->
             <div class="content">
                 <div class="container-fluid">
                     <div class="row">
                         <div class="col-md-8">
                             <div class="card">
                                 <div class="card-header">
                                     <h4 class="card-title">Edit Profile</h4>
                                 </div>
                                 <div class="card-body">
                                     <form>
                                         <div class="row">
                                             <div class="col-md-5 pr-1">
                                                 <div class="form-group">
                                                     <label>Company (disabled)</label>
                                                     <input type="text" class="form-control" disabled="" placeholder="Company" value="Creative Code Inc.">
                                                 </div>
                                             </div>
                                             <div class="col-md-3 px-1">
                                                 <div class="form-group">
                                                     <label>Username</label>
                                                     <input type="text" class="form-control" placeholder="Username" value="michael23">
                                                 </div>
                                             </div>
                                             <div class="col-md-4 pl-1">
                                                 <div class="form-group">
                                                     <label for="exampleInputEmail1">Email address</label>
                                                     <input type="email" class="form-control" placeholder="Email">
                                                 </div>
                                             </div>
                                         </div>
                                         <div class="row">
                                             <div class="col-md-6 pr-1">
                                                 <div class="form-group">
                                                     <label>First Name</label>
                                                     <input type="text" class="form-control" placeholder="Company" value="Mike">
                                                 </div>
                                             </div>
                                             <div class="col-md-6 pl-1">
                                                 <div class="form-group">
                                                     <label>Last Name</label>
                                                     <input type="text" class="form-control" placeholder="Last Name" value="Andrew">
                                                 </div>
                                             </div>
                                         </div>
                                         <div class="row">
                                             <div class="col-md-12">
                                                 <div class="form-group">
                                                     <label>Address</label>
                                                     <input type="text" class="form-control" placeholder="Home Address" value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09">
                                                 </div>
                                             </div>
                                         </div>
                                         <div class="row">
                                             <div class="col-md-4 pr-1">
                                                 <div class="form-group">
                                                     <label>City</label>
                                                     <input type="text" class="form-control" placeholder="City" value="Mike">
                                                 </div>
                                             </div>
                                             <div class="col-md-4 px-1">
                                                 <div class="form-group">
                                                     <label>Country</label>
                                                     <input type="text" class="form-control" placeholder="Country" value="Andrew">
                                                 </div>
                                             </div>
                                             <div class="col-md-4 pl-1">
                                                 <div class="form-group">
                                                     <label>Postal Code</label>
                                                     <input type="number" class="form-control" placeholder="ZIP Code">
                                                 </div>
                                             </div>
                                         </div>
                                         <div class="row">
                                             <div class="col-md-12">
                                                 <div class="form-group">
                                                     <label>About Me</label>
                                                     <textarea rows="4" cols="80" class="form-control" placeholder="Here can be your description" value="Mike">Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.</textarea>
                                                 </div>
                                             </div>
                                         </div>
                                         <button type="submit" class="btn btn-info btn-fill pull-right">Update Profile</button>
                                         <div class="clearfix"></div>
                                     </form>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
             <footer class="footer">
                 <div class="container-fluid">
                     <nav>
                         <ul class="footer-menu">
                             <li>
                                 <a href="#">
                                     Home
                                 </a>
                             </li>
                             <li>
                                 <a href="#">
                                     Company
                                 </a>
                             </li>
                             <li>
                                 <a href="#">
                                     Portfolio
                                 </a>
                             </li>
                             <li>
                                 <a href="#">
                                     Blog
                                 </a>
                             </li>
                         </ul>
                         <p class="copyright text-center">
                             ©
                             <script>
                                 document.write(new Date().getFullYear())
                             </script>
                             <a href="http://www.creative-tim.com">Creative Tim</a>, made with love for a better web
                         </p>
                     </nav>
                 </div>
             </footer>
         </div>
     </div>
 </body>
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src='https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js'></script>

<script src="assets/js/core/popper.min.js" type="text/javascript"></script>
<script src="assets/js/core/bootstrap.min.js" type="text/javascript"></script>

<script src="assets/js/light-bootstrap-dashboard.js?v=2.0.0 " type="text/javascript"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
<script src="assets/js/validar.js" type="text/javascript"></script>
 
 </html>
 