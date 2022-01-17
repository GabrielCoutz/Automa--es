-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17-Jan-2022 às 16:35
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
(25, '501.513.798-23', 'gabriel coutinho cassiano', '4444 4444 4444 4444', '04/2028', 444, 'premium');

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa`
--

CREATE TABLE `empresa` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `nome_fantasia` varchar(30) NOT NULL,
  `cnpj` varchar(20) NOT NULL,
  `ramo` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `empresa`
--

INSERT INTO `empresa` (`id`, `id_usuario`, `nome`, `nome_fantasia`, `cnpj`, `ramo`) VALUES
(22, 107, 'kairos MK', 'Kairos', '97.201.044/0001-11', 'Tecnologia');

-- --------------------------------------------------------

--
-- Estrutura da tabela `endereco`
--

CREATE TABLE `endereco` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
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

INSERT INTO `endereco` (`id`, `id_usuario`, `cep`, `rua`, `numero`, `bairro`, `cidade`, `estado`) VALUES
(45, 107, '08.588-310', 'Estrada da Promissão', '43', 'Jardim Carolina', 'Itaquaquecetuba', 'SP');

-- --------------------------------------------------------

--
-- Estrutura da tabela `endereco_empresa`
--

CREATE TABLE `endereco_empresa` (
  `id` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
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

INSERT INTO `endereco_empresa` (`id`, `id_empresa`, `cep`, `rua`, `numero`, `bairro`, `cidade`, `estado`) VALUES
(1, 22, '08.588-350', 'Rua Padre Benedito de Camargo', '43', 'Jardim Carolina', 'Itaquaquecetuba', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(10) NOT NULL,
  `nome` varchar(40) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `cep` varchar(10) NOT NULL,
  `senha` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `telefone`, `email`, `cpf`, `cep`, `senha`) VALUES
(107, 'gabriel coutinho cassiano', '(11) 9531-78289', 'gabriel.coutinho.cassiano@gmail.com', '501.513.798-23', '08.588-310', '43430045bd4c5ffd1ece5cb3333da1ef');

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
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices para tabela `endereco`
--
ALTER TABLE `endereco`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices para tabela `endereco_empresa`
--
ALTER TABLE `endereco_empresa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_empresa` (`id_empresa`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de tabela `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de tabela `endereco`
--
ALTER TABLE `endereco`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de tabela `endereco_empresa`
--
ALTER TABLE `endereco_empresa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

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
  ADD CONSTRAINT `empresa_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Limitadores para a tabela `endereco`
--
ALTER TABLE `endereco`
  ADD CONSTRAINT `endereco_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Limitadores para a tabela `endereco_empresa`
--
ALTER TABLE `endereco_empresa`
  ADD CONSTRAINT `endereco_empresa_ibfk_1` FOREIGN KEY (`id_empresa`) REFERENCES `empresa` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
