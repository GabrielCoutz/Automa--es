-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 24-Jan-2022 às 15:35
-- Versão do servidor: 10.4.22-MariaDB
-- versão do PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `kairos`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cartao`
--

CREATE TABLE `cartao` (
  `id` int(11) NOT NULL,
  `cpf_usuario` varchar(20) NOT NULL,
  `titular` varchar(100) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `validade` varchar(10) NOT NULL,
  `cvv` int(3) NOT NULL,
  `assinatura` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `cartao`
--

INSERT INTO `cartao` (`id`, `cpf_usuario`, `titular`, `numero`, `validade`, `cvv`, `assinatura`) VALUES
(1, '501.513.798-23', 'xampson', '4444 4444 4444 4444', '07/2030', 413, 'premium');

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa`
--

CREATE TABLE `empresa` (
  `id` int(11) NOT NULL,
  `cpf_usuario` varchar(20) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `nome_fantasia` varchar(30) NOT NULL,
  `cnpj` varchar(20) NOT NULL,
  `ramo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `empresa`
--

INSERT INTO `empresa` (`id`, `cpf_usuario`, `nome`, `nome_fantasia`, `cnpj`, `ramo`) VALUES
(33, '501.513.798-23', 'kairos', 'Kaiross', '97.201.044/0001-11', 'Educação');

-- --------------------------------------------------------

--
-- Estrutura da tabela `endereco`
--

CREATE TABLE `endereco` (
  `id` int(11) NOT NULL,
  `cpf_usuario` varchar(20) NOT NULL,
  `cep` varchar(10) NOT NULL,
  `rua` varchar(50) NOT NULL,
  `numero` varchar(5) NOT NULL,
  `bairro` varchar(50) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `endereco`
--

INSERT INTO `endereco` (`id`, `cpf_usuario`, `cep`, `rua`, `numero`, `bairro`, `cidade`, `estado`) VALUES
(1, '501.513.798-23', '08.588-310', 'Estrada da Promissão', '280', 'Jardim Carolina', 'Itaquaquecetuba', 'SP');

-- --------------------------------------------------------

--
-- Estrutura da tabela `endereco_empresa`
--

CREATE TABLE `endereco_empresa` (
  `id` int(11) NOT NULL,
  `cnpj_empresa` varchar(20) NOT NULL,
  `cep` varchar(20) NOT NULL,
  `rua` varchar(50) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `bairro` varchar(50) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `endereco_empresa`
--

INSERT INTO `endereco_empresa` (`id`, `cnpj_empresa`, `cep`, `rua`, `numero`, `bairro`, `cidade`, `estado`) VALUES
(1, '97.201.044/0001-11', '08.588-310', 'Estrada da Promissão', '63', 'Jardim Carolina', 'Itaquaquecetuba', 'SP');

-- --------------------------------------------------------

--
-- Estrutura da tabela `telefone`
--

CREATE TABLE `telefone` (
  `id` int(11) NOT NULL,
  `cpf_usuario` varchar(20) NOT NULL,
  `tel` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `telefone`
--

INSERT INTO `telefone` (`id`, `cpf_usuario`, `tel`) VALUES
(3, '501.513.798-23', '(55) 1195-31782');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(10) NOT NULL,
  `nome` varchar(40) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `cep` varchar(10) NOT NULL,
  `senha` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `cpf`, `cep`, `senha`) VALUES
(1, 'xampson', 'gabriel.coutinho.cassiano@gmail.com', '501.513.798-23', '08.588-310', '43430045bd4c5ffd1ece5cb3333da1ef');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `cartao`
--
ALTER TABLE `cartao`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf_usuario` (`cpf_usuario`);

--
-- Índices para tabela `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf_usuario` (`cpf_usuario`),
  ADD UNIQUE KEY `cnpj` (`cnpj`);

--
-- Índices para tabela `endereco`
--
ALTER TABLE `endereco`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_usuario` (`cpf_usuario`);

--
-- Índices para tabela `endereco_empresa`
--
ALTER TABLE `endereco_empresa`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cnpj_empresa` (`cnpj_empresa`);

--
-- Índices para tabela `telefone`
--
ALTER TABLE `telefone`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf_usuario` (`cpf_usuario`),
  ADD KEY `tel` (`tel`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf` (`cpf`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cartao`
--
ALTER TABLE `cartao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de tabela `endereco`
--
ALTER TABLE `endereco`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `endereco_empresa`
--
ALTER TABLE `endereco_empresa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `telefone`
--
ALTER TABLE `telefone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `cartao`
--
ALTER TABLE `cartao`
  ADD CONSTRAINT `fk_cpf_usuario` FOREIGN KEY (`cpf_usuario`) REFERENCES `usuario` (`cpf`);

--
-- Limitadores para a tabela `empresa`
--
ALTER TABLE `empresa`
  ADD CONSTRAINT `empresa_ibfk_1` FOREIGN KEY (`cpf_usuario`) REFERENCES `usuario` (`cpf`);

--
-- Limitadores para a tabela `endereco`
--
ALTER TABLE `endereco`
  ADD CONSTRAINT `endereco_ibfk_1` FOREIGN KEY (`cpf_usuario`) REFERENCES `usuario` (`cpf`);

--
-- Limitadores para a tabela `endereco_empresa`
--
ALTER TABLE `endereco_empresa`
  ADD CONSTRAINT `endereco_empresa_ibfk_1` FOREIGN KEY (`cnpj_empresa`) REFERENCES `empresa` (`cnpj`);

--
-- Limitadores para a tabela `telefone`
--
ALTER TABLE `telefone`
  ADD CONSTRAINT `telefone_ibfk_1` FOREIGN KEY (`cpf_usuario`) REFERENCES `usuario` (`cpf`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
