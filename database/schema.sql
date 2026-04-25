-- ==========================================
-- NEXGEN CONNECT - MODELAGEM DO BANCO DE DADOS
-- ==========================================

-- 1. CRIAÇÃO DAS TABELAS (DDL)
CREATE TABLE Departamentos (
    id_departamento INT PRIMARY KEY AUTO_INCREMENT,
    nome_departamento VARCHAR(50) NOT NULL
);

CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    papel ENUM('Colaborador', 'Tecnico') NOT NULL,
    id_departamento INT,
    FOREIGN KEY (id_departamento) REFERENCES Departamentos(id_departamento)
);

CREATE TABLE Chamados (
    id_chamado INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    urgencia ENUM('Baixa', 'Média', 'Alta') DEFAULT 'Baixa',
    status ENUM('Aberto', 'Em Andamento', 'Concluído') DEFAULT 'Aberto',
    data_abertura DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_colaborador INT NOT NULL,
    id_tecnico INT,
    FOREIGN KEY (id_colaborador) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_tecnico) REFERENCES Usuarios(id_usuario)
);
