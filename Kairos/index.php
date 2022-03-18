<!DOCTYPE html>
<html class="no-js" lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Kairos</title>
    <link rel="stylesheet" href="assets/css/bootstrap-5.0.0-beta2.min.css"/>
    <link rel="stylesheet" href="assets/css/LineIcons.2.0.css"/>
    <link rel="stylesheet" href="assets/css/tiny-slider.css"/>
    <link rel="stylesheet" href="assets/css/animate2.css"/>
    <link rel="stylesheet" href="assets/css/main.css"/>

    <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.svg"/>
    
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"/>

    <link rel="shortcut icon" href="assets/img/favicon/favicon.ico" type="image/x-icon"/>

    <?php
      session_start();
      session_unset();
      session_destroy();
      session_write_close();
      setcookie(session_name(),'',0,'/');
      session_regenerate_id(true);
    ?>
    

  </head>
  <body>
    <div class="preloader">
      <div class="loader">
        <div class="spinner">
          <div class="spinner-container">
            <div class="spinner-rotator">
              <div class="spinner-left">
                <div class="spinner-circle"></div>
              </div>
              <div class="spinner-right">
                <div class="spinner-circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
		<!-- preloader end -->
		

    <!-- ========================= header start ========================= -->
    <header class="header">
      <div class="navbar-area">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-12">
              <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="index.html">
                  <img src="assets/img/logo/airos.png" alt="Logo" />
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                  <ul id="nav" class="navbar-nav ms-auto">
                    <li class="nav-item">
                      <a class="page-scroll active" href="#home">Início</a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="#about">Sobre</a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="#service">Métodos</a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="#pricing">Planos</a>
                    </li>
                    <li class="nav-item">
                      <a href="Login/login">Login</a>
                    </li>
                    <li class="nav-item">
                    </li>
                  </ul>
                </div>
                <!-- navbar collapse -->
              </nav>
              <!-- navbar -->
            </div>
          </div>
          <!-- row -->
        </div>
        <!-- container -->
      </div>
      <!-- navbar area -->
    </header>
    <!-- ========================= header end ========================= -->

    <!-- ========================= hero-section start ========================= -->
    <section id="home" class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content">
							<span class="wow fadeInLeft mouseoff" data-wow-delay=".2s">Bem vindo ao Kairos</span>
              <h1 class="wow fadeInUp mouseoff" data-wow-delay=".4s">
								Uma plataforma pensada e desenvolvida para Você.
							</h1>
              <p class="wow fadeInUp mouseoff" data-wow-delay=".6s">
                Mais que uma ferramenta, um meio para alcançar seu sucesso no mercado. (ih ala o corno tbm é coach KKKK)
              </p>
							<a href="CadastroUsuario/cadastro_usuario" class="main-btn btn-hover wow fadeInUp" data-wow-delay=".6s">Começar Agora</a>
            </div>
					</div>
					<div class="col-lg-6">
						<div class="hero-img wow fadeInUp" data-wow-delay=".5s">
							<img src="assets/img/hero/teste.png" id="imagem_inicial"alt="">
						</div>
					</div>
        </div>
			</div>
    </section>

		<!-- ========================= -section start ========================= -->
		<section id="about" class="about-section pt-150">
			<div class="container">
				<div class="row">
					<div class="col-lg-6">
						<div class="about-img mb-50">
							<img src="assets/img/about/sobre.png" alt="about">
						</div>
					</div>
					<div class="col-lg-6">
						<div class="about-content mb-50">
							<div class="section-title mb-50 fadeInLeft mouseoff">
								<h1 class="mb-25">Conheça um pouco sobre nós</h1>
								<p>Utilizamos táticas de marketing para axuliar na criação e desenvolimento de marcas, apoiando startups, micro e pequenas empresas a entenderem seu público alvo e personas, bem como criar serviços e produtos, que não só atendam mas superem as expectativas de seus clientes.</p>
							</div>
							<div class="accordion pb-15" id="accordionExample">
								<div class="single-faq">
									<button class="w-100 text-start" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
										Quais serviços oferecemos?
									</button>
							
									<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
										<div class="faq-content mouseoff">
											Ofertamos serviços de pesquisa de campo, análise de mercado e entendimento amplo sobre a àrea de atuação da empresa contratada.
										</div>
									</div>
								</div>
								<div class="single-faq">
									<button class="w-100 text-start collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
										Preciso de algo para iniciar um projeto?
									</button>
									<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
										<div class="faq-content mouseoff">
											É claro, tu é burré? Como vai começar um bagui q nem tu sabe oq é? '-'
										</div>
									</div>
								</div>
								<div class="single-faq">
									<button class="w-100 text-start collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
										Qual nossa política de trabalho?
									</button>
									<div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
										<div class="faq-content mouseoff">
											Com nossas equipes especialisadas em Marketing, Business e Branding, nos certificamos que cada projeto seja único, pontual, consistente e principalmente, personalizado para cada cliente.
										</div>
									</div>
								</div>
							</div>
							<a href="CadastroUsuario/cadastro_usuario" class="main-btn btn-hover">Incrível né? =D</a>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- ========================= about-section end ========================= -->

		<!-- ========================= service-section start ========================= -->
		<section id="service" class="service-section img-bg pt-100 pb-100 mt-150 mouseoff">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-xxl-5 col-xl-6 col-lg-7 col-md-10">
						<div class="section-title text-center mb-50 ">
							<h1>Nossos Métodos</h1>
							<p>Assim como cada pessoa, nossos projetos são únicos, especiais e sempre desenvolvidos com muito carinho e atenção.</p>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xl-3 col-md-6">
						<div class="single-service">
							<div class="icon color-1">
								<i class="lni lni-layers"></i>
							</div>
							<div class="content">
								<h3>Análise SWOT/FOFA</h3>
								<p>Pesquisas sobre Strengths/Forças, Weaknesses/Fraquezas, Opportunities/Oportunidades e Threats/Ameaças.</p>
							</div>
						</div>
					</div>
					<div class="col-xl-3 col-md-6">
						<div class="single-service">
							<div class="icon color-2">
								<i class="lni lni-code-alt"></i>
							</div>
							<div class="content">
								<h3>4 Ps</h3>
								<p>Profunda análise sobre Preço, Produto, Praça e Promoção.</p>
							</div>
						</div>
					</div>
					<div class="col-xl-3 col-md-6">
						<div class="single-service">
							<div class="icon color-3">
								<i class="lni lni-pallet"></i>
							</div>
							<div class="content">
								<h3>Marketing Digital</h3>
								<p>Lorem ipsum dolor sitsdw consetsad pscing eliewtr, diam nonumy.</p>
							</div>
						</div>
					</div>
					<div class="col-xl-3 col-md-6">
						<div class="single-service">
							<div class="icon color-4">
								<i class="lni lni-vector"></i>
							</div>
							<div class="content">
								<h3>Xampson</h3>
								<p>Lorem ipsum dolor sitsdw consetsad pscing eliewtr, diam nonumy.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="view-all-btn text-center pt-30">
					<a href="CadastroUsuario/cadastro_usuario" class="main-btn btn-hover">Porque não começar hoje?</a>
				</div>

			</div>
		</section>
		<!-- ========================= service-section end ========================= -->

		<section class="bg-light py-5 border-bottom mouseoff" id="pricing">
            <div class="container px-5 my-5">
                <div class="text-center mb-5">
                    <h2 class="fw-bolder fadeInDown">Planos de Serviço</h2>
                    <p class="lead mb-0 fadeInUp">Seu negócio, suas regras.</p>
                </div>
                <div class="row gx-5 justify-content-center">
                    <!-- Pricing card free-->
                    <div class="col-lg-6 col-xl-4 fadeInUp">
                        <div class="card mb-5 mb-xl-0">
                            <div class="card-body p-5">
                                <div class="small text-uppercase fw-bold text-muted">Básico</div>
                                <div class="mb-3">
                                    <span class="display-4 fw-bold">R$ 19,00</span>
                                    <span class="fw-bold"><br>/mês</span>
                                </div>
                                <ul class="list-unstyled mb-4">
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Definição de Cores
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Atendimento seg à sex
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Suporte 8 às 18:00
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        1 Visita física p/mês
                                    </li>
                                    <li class="mb-2 text-muted">
                                        <i class="bi bi-x"></i>
                                        Consultoria de Marketing
                                    </li>
                                    <li class="mb-2 text-muted">
                                        <i class="bi bi-x"></i>
                                        Dedicated support
                                    </li>
                                    <li class="mb-2 text-muted">
                                        <i class="bi bi-x"></i>
                                        Plano de Negócios
                                    </li>
                                    <li class="text-muted">
                                        <i class="bi bi-x"></i>
                                        Análise de Resultados
                                    </li>
                                </ul>
                                <div class="d-grid"><a class="btn btn-outline-primary" href="CadastroUsuario/cadastro_usuario">Escolher Plano</a></div>
                            </div>
                        </div>
                    </div>
                    <!-- Pricing card pro-->
                    <div class="col-lg-6 col-xl-4 fadeInUp">
                        <div class="card mb-5 mb-xl-0">
                            <div class="card-body p-5">
                                <div class="small text-uppercase fw-bold">
                                    <i class="bi bi-star-fill text-warning"></i>
                                    Intermediário
                                </div>
                                <div class="mb-3">
                                    <span class="display-4 fw-bold">R$ 35,00</span>
                                    <span class="fw-bold">/mês</span>
                                </div>
                                <ul class="list-unstyled mb-4">
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Definição de Cores
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Atendimento seg à sex
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Suporte 24h
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        3 Visitas Físicas p/mês
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Consultoria de Marketing
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Dedicated support
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-x"></i>
                                        Plano de Negócios
                                    </li>
                                    <li class="text-muted">
                                        <i class="bi bi-x"></i>
                                        Análise de Resultados
                                    </li>
                                </ul>
                                <div class="d-grid"><a class="btn btn-primary" href="CadastroUsuario/cadastro_usuario">Escolher Plano</a></div>
                            </div>
                        </div>
                    </div>
                    <!-- Pricing card enterprise-->
                    <div class="col-lg-6 col-xl-4 fadeInUp">
                        <div class="card">
                            <div class="card-body p-5">
                                <div class="small text-uppercase fw-bold text-muted">Premium</div>
                                <div class="mb-3">
                                    <span class="display-4 fw-bold">R$ 45,00</span>
                                    <span class="fw-bold">/mês</span>
                                </div>
                                <ul class="list-unstyled mb-4">
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Definição de Cores
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Atendimento 24/7
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        xampson
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        5 Visitas Físicas p/mês
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Consultoria de Marketing
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Dedicated support
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Plano de Negócios
                                    </li>
                                    <li class="text-muted">
                                        <i class="bi bi-check text-primary"></i>
                                        Análise de Resultados
                                    </li>
                                </ul>
                                <div class="d-grid"><a class="btn btn-outline-primary" href="CadastroUsuario/cadastro_usuario">Escolher Plano</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
		<!-- ========================= cta-section start ========================= -->
		<section class="cta-section img-bg pt-110 pb-60 mouseoff">
			<div class="container">
				<div class="row align-items-center">
					<div class="col-xl-6 col-lg-7">
						<div class="section-title mb-50">
							<h1 class="mb-20 wow fadeInUp" data-wow-delay=".2s">Já tem um projeto em mente?
								Maravilha!<br> Vamos começar agora mesmo!
							</h1>
						</div>
					</div>
					<div class="col-xl-6 col-lg-5">
						<div class="cta-btn text-lg-end mb-50">
							<a href="CadastroUsuario/cadastro_usuario" class="main-btn btn-hover text-uppercase">Basta nos contatar!</a>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- ========================= cta-section end ========================= -->

    <!-- ========================= footer start ========================= -->
		<footer class="footer">
			<div class="container">
				<div class="widget-wrapper">
					<div class="row">
						<div class="col-xl-3 col-md-6">
							<div class="footer-widget">
								<div class="logo mb-35">
									<a href="index.html"> <img src="assets/img/logo/logo.svg" alt=""> </a>
								</div>
								<p class="desc mb-35">We are expert designer team, There have a lot of designer and developer If you have any project you can hire Create a website.</p>
								<ul class="socials">
									<li>
										<a href="jvascript:void(0)"> <i class="lni lni-facebook-filled"></i> </a>
									</li>
									<li>
										<a href="jvascript:void(0)"> <i class="lni lni-twitter-filled"></i> </a>
									</li>
									<li>
										<a href="jvascript:void(0)"> <i class="lni lni-instagram-filled"></i> </a>
									</li>
									<li>
										<a href="jvascript:void(0)"> <i class="lni lni-linkedin-original"></i> </a>
									</li>
								</ul>
							</div>
						</div>

						<div class="col-xl-2 offset-xl-1 col-md-5 offset-md-1 col-sm-6">
							<div class="footer-widget">
								<h3>Link</h3>
								<ul class="links">
									<li> <a href="javascript:void(0)">Home</a> </li>
									<li> <a href="javascript:void(0)">About</a> </li>
									<li> <a href="javascript:void(0)">Services</a> </li>
									<li> <a href="javascript:void(0)">Pricing</a> </li>
									<li> <a href="javascript:void(0)">Contact</a> </li>
								</ul>
							</div>
						</div>

						<div class="col-xl-3 col-md-6 col-sm-6">
							<div class="footer-widget">
								<h3>Services</h3>
								<ul class="links">
									<li> <a href="javascript:void(0)">Graphic design</a> </li>
									<li> <a href="javascript:void(0)">Web design</a> </li>
									<li> <a href="javascript:void(0)">Visual design</a> </li>
									<li> <a href="javascript:void(0)">Product design</a> </li>
									<li> <a href="javascript:void(0)">UI/UX design</a> </li>
									<li> <a href="javascript:void(0)">Web development</a> </li>
									<li> <a href="javascript:void(0)">Startup business</a> </li>
								</ul>
							</div>
						</div>

						<div class="col-xl-3 col-md-6">
							<div class="footer-widget">
								<h3>Contact</h3>
								<ul>
									<li>+003894372632</li>
									<li>helldesigner@gmail.ccom</li>
									<li>United state of America</li>
								</ul>
								<div class="contact_map" style="width: 100%; height: 150px; margin-top: 25px;">
									<div class="gmap_canvas">
										<iframe id="gmap_canvas" src="https://maps.google.com/maps?q=Mission%20District%2C%20San%20Francisco%2C%20CA%2C%20USA&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" style="width: 100%;"></iframe>
									</div>
									</div>
							</div>
						</div>

					</div>
				</div>

			</div>
		</footer>
    <!-- ========================= footer end ========================= -->

    <!-- ========================= scroll-top ========================= -->
    <a href="#" class="scroll-top btn-hover">
      <i class="lni lni-chevron-up"></i>
    </a>

    <!-- ========================= JS here ========================= -->
    <script src="assets/js/bootstrap-5.0.0-beta2.min.js"></script>
    <script src="assets/js/count-up.min.js"></script>
    <script src="assets/js/tiny-slider.js"></script>
    <script src="assets/js/wow.min.js"></script>
    <script src="assets/js/polifill.js"></script>
    <script src="assets/js/main.js"></script>
  </body>
</html>
