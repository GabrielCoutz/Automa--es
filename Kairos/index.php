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
      error_reporting(E_ERROR | E_PARSE);
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
                      <a class="page-scroll active" href="#home">In??cio</a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="#about">Sobre</a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="#service">M??todos</a>
                    </li>
                    <li class="nav-item">
                      <a class="page-scroll" href="#pricing">Planos</a>
                    </li>
                    <li class="nav-item">
                      <a href="Login/login">Login</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section id="home" class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content">
							<span class="wow fadeInLeft mouseoff" data-wow-delay=".2s">Bem vindo ao Kairos</span>
              <h1 class="wow fadeInUp mouseoff" data-wow-delay=".4s">
								Uma plataforma pensada e desenvolvida para Voc??.
							</h1>
              <p class="wow fadeInUp mouseoff" data-wow-delay=".6s">
                Mais que uma ferramenta, um meio para alcan??ar seu sucesso no mercado.
              </p>
							<a href="CadastroUsuario/cadastro_usuario" class="main-btn btn-hover wow fadeInUp" data-wow-delay=".6s">Come??ar Agora</a>
            </div>
					</div>
					<div class="col-lg-6">
						<div class="hero-img wow fadeInUp" data-wow-delay=".5s">
							<img src="assets/img/hero/equipe.png" id="imagem_inicial"alt="">
						</div>
					</div>
        </div>
			</div>
    </section>

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
								<h1 class="mb-25">Conhe??a um pouco sobre n??s</h1>
								<p>Utilizamos t??ticas de marketing para auxiliar na cria????o e desenvolimento de neg??cios, apoiando startups, micro e pequenas empresas a entenderem seu p??blico alvo e personas, bem como posicionar servi??os e produtos, que n??o s?? atendam mas superem as expectativas de seus clientes.</p>
							</div>
							<div class="accordion pb-15" id="accordionExample">
								<div class="single-faq">
									<button class="w-100 text-start" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
										Quais servi??os oferecemos?
									</button>
							
									<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
										<div class="faq-content mouseoff">
											Ofertamos servi??os an??lise de mercado e entendimento amplo sobre a ??rea de atua????o da empresa contratada, por meio de estrat??gias e conceitos do Marketing.
										</div>
									</div>
								</div>
								<div class="single-faq">
									<button class="w-100 text-start collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
										Preciso de algo para iniciar um projeto?
									</button>
									<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
										<div class="faq-content mouseoff">
											Apenas uma ideia ou no????o de o que deseja, o resto pode deixar com a gente.
										</div>
									</div>
								</div>
								<div class="single-faq">
									<button class="w-100 text-start collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
										Qual nossa pol??tica de trabalho?
									</button>
									<div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
										<div class="faq-content mouseoff">
											Com nossas an??lises de Marketing e tratamento de dados, nos certificamos que cada projeto seja ??nico, pontual, consistente e principalmente, personalizado para cada cliente.
										</div>
									</div>
								</div>
							</div>
							<a href="CadastroUsuario/cadastro_usuario" class="main-btn btn-hover">&#128516; Incr??vel, n???</a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section id="service" class="service-section img-bg pt-100 pb-100 mt-150 mouseoff">
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-xxl-5 col-xl-6 col-lg-7 col-md-10">
						<div class="section-title text-center mb-50 ">
							<h1>Nossos M??todos</h1>
							<p>Assim como cada pessoa, nossos projetos s??o ??nicos, especiais e sempre desenvolvidos com muito carinho e aten????o.</p>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-xl-3 col-md-6">
						<div class="single-service">
							<div class="icon color-1">
								<i class="lni lni-grid-alt"></i>
							</div>
							<div class="content">
								<h3>An??lise SWOT/FOFA</h3>
								<p>Pesquisas sobre Strengths/For??as, Weaknesses/Fraquezas, Opportunities/Oportunidades e Threats/Amea??as.</p>
							</div>
						</div>
					</div>
					<div class="col-xl-3 col-md-6">
						<div class="single-service">
							<div class="icon color-2">
								<i class="lni lni-target-revenue"></i>
							</div>
							<div class="content">
								<h3>4'Ps do Marketing</h3>
								<p>An??lise sobre Pre??o, Produto, Pra??a e Promo????o.</p>
							</div>
						</div>
					</div>
					<div class="col-xl-3 col-md-6">
						<div class="single-service">
							<div class="icon color-3">
								<i class="lni lni-graph"></i>
							</div>
							<div class="content">
								<h3>Marketing Digital</h3>
								<p>Aplica????o e Valida????o das informa????es obtidas.</p>
							</div>
						</div>
					</div>
				</div>

				<div class="view-all-btn text-center pt-30">
					<a href="CadastroUsuario/cadastro_usuario" class="main-btn btn-hover">Porque n??o come??ar hoje?</a>
				</div>

			</div>
		</section>

		<section class="bg-light py-5 border-bottom mouseoff" id="pricing">
            <div class="container px-5 my-5">
                <div class="text-center mb-5">
                    <h2 class="fw-bolder fadeInDown">Planos de Servi??o</h2>
                    <p class="lead mb-0 fadeInUp">Seu neg??cio, suas regras.</p>
                </div>
                <div class="row gx-5 justify-content-center">

                    <div class="col-lg-6 col-xl-4 fadeInUp">
                        <div class="card mb-5 mb-xl-0">
                            <div class="card-body p-5">
                                <div class="small text-uppercase fw-bold text-muted">B??sico</div>
                                <div class="mb-3">
                                    <span class="display-4 fw-bold">R$ 19,00</span>
                                    <span class="fw-bold"><br>/m??s</span>
                                </div>
                                <ul class="list-unstyled mb-4">
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        An??lise de Marketing
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Atendimento seg ?? sex
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Suporte 8 ??s 18:00
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        1 Visita f??sica p/m??s
                                    </li>
                                    <li class="mb-2 text-muted">
                                        <i class="bi bi-x"></i>
                                        Consultoria de Marketing
                                    </li>
                                    <li class="mb-2 text-muted">
                                        <i class="bi bi-x"></i>
                                        Plano de Neg??cios
                                    </li>
                                    <li class="text-muted">
                                        <i class="bi bi-x"></i>
                                        An??lise de Resultados
                                    </li>
                                </ul>
                                <div class="d-grid"><a class="btn btn-outline-primary" href="CadastroUsuario/cadastro_usuario">Escolher Plano</a></div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 col-xl-4 fadeInUp">
                        <div class="card mb-5 mb-xl-0">
                            <div class="card-body p-5">
                                <div class="small text-uppercase fw-bold">
                                    <i class="bi bi-star-fill text-warning"></i>
                                    Intermedi??rio
                                </div>
                                <div class="mb-3">
                                    <span class="display-4 fw-bold">R$ 35,00</span>
                                    <span class="fw-bold">/m??s</span>
                                </div>
                                <ul class="list-unstyled mb-4">
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        An??lise de Marketing
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Atendimento seg ?? sex
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Suporte 24h
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        3 Visitas F??sicas p/m??s
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Consultoria de Marketing
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-x"></i>
                                        Plano de Neg??cios
                                    </li>
                                    <li class="text-muted">
                                        <i class="bi bi-x"></i>
                                        An??lise de Resultados
                                    </li>
                                </ul>
                                <div class="d-grid"><a class="btn btn-primary" href="CadastroUsuario/cadastro_usuario">Escolher Plano</a></div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 col-xl-4 fadeInUp">
                        <div class="card">
                            <div class="card-body p-5">
                                <div class="small text-uppercase fw-bold text-muted">Premium</div>
                                <div class="mb-3">
                                    <span class="display-4 fw-bold">R$ 45,00</span>
                                    <span class="fw-bold">/m??s</span>
                                </div>
                                <ul class="list-unstyled mb-4">
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        An??lise de Marketing
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Atendimento 24/7
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Suporte 24h
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        5 Visitas F??sicas p/m??s
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Consultoria de Marketing
                                    </li>
                                    <li class="mb-2">
                                        <i class="bi bi-check text-primary"></i>
                                        Plano de Neg??cios
                                    </li>
                                    <li class="text-muted">
                                        <i class="bi bi-check text-primary"></i>
                                        An??lise de Resultados
                                    </li>
                                </ul>
                                <div class="d-grid"><a class="btn btn-outline-primary" href="CadastroUsuario/cadastro_usuario">Escolher Plano</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

		<section class="cta-section img-bg pt-110 pb-60 mouseoff">
			<div class="container">
				<div class="row align-items-center">
					<div class="col-xl-6 col-lg-7">
						<div class="section-title mb-50">
							<h1 class="mb-20 wow fadeInUp" data-wow-delay=".2s">J?? tem um projeto em mente?
								Maravilha!<br>Vamos come??ar agora mesmo!
							</h1>
						</div>
					</div>
					<div class="col-xl-6 col-lg-5">
						<div class="cta-btn text-lg-end mb-50">
							<a href="CadastroUsuario/cadastro_usuario" class="main-btn btn-hover">Basta nos contatar!</a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<footer class="footer">
			<div class="container">
				<div class="widget-wrapper">
					<div class="row">
						<div class="col-xl-2 offset-xl-1 col-md-5 offset-md-1 col-sm-6">
							<div class="footer-widget">
								<h3>Links</h3>
								<ul class="links">
									<li> <a href="#home">In??cio</a> </li>
									<li> <a href="#service">Sobre</a> </li>
									<li> <a href="#service">M??todos</a> </li>
									<li> <a href="#pricing">Planos</a> </li>
									<li> <a href="Contato/contato" target="_blank">Contato</a> </li>
								</ul>
							</div>
						</div>

						<div class="col-xl-3 col-md-6 col-sm-6">
							<div class="footer-widget">
								<h3>Servi??os</h3>
								<ul class="links">
									<li> An??lise SWOT </li>
									<li> 4P's do Marketing </li>
									<li> Marketing Digital </li>
								</ul>
							</div>
						</div>

						<div class="col-xl-3 col-md-6">
							<div class="footer-widget">
								<h3>Contato</h3>
								<ul>
									<li>kairozprojeto@gmail.com</li>
								</ul>
							</div>
						</div>

					</div>
				</div>

			</div>
		</footer>
    <a class="scroll-top btn-hover">
      <i class="lni lni-chevron-up"></i>
    </a>

    <script src="assets/js/bootstrap-5.0.0-beta2.min.js"></script>
    <script src="assets/js/count-up.min.js"></script>
    <script src="assets/js/tiny-slider.js"></script>
    <script src="assets/js/wow.min.js"></script>
    <script src="assets/js/polifill.js"></script>
    <script src="assets/js/main.js"></script>
  </body>
</html>
