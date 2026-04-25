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

-- ==========================================
-- 2. INSERÇÃO DE DADOS (DML - INSERT)
-- ==========================================
INSERT INTO Departamentos (nome_departamento) VALUES ('Recursos Humanos'), ('Financeiro'), ('TI');

INSERT INTO Usuarios (nome, email, papel, id_departamento) VALUES 
('Ana Souza', 'ana.rh@empresa.com', 'Colaborador', 1),
('Carlos Mendes', 'carlos.fin@empresa.com', 'Colaborador', 2),
('Administrador TI', 'admin.ti@nexgen.com', 'Tecnico', 3);

INSERT INTO Chamados (titulo, descricao, urgencia, id_colaborador) VALUES 
('Impressora não puxa papel', 'A impressora do RH está atolando papel constantemente.', 'Média', 1),
('Sistema ERP fora do ar', 'Não consigo acessar o módulo de notas fiscais.', 'Alta', 2);

-- ==========================================
-- 3. ATUALIZAÇÃO E REMOÇÃO DE DADOS (DML - UPDATE/DELETE)
-- ==========================================
UPDATE Chamados SET status = 'Em Andamento', id_tecnico = 3 WHERE id_chamado = 2;
DELETE FROM Chamados WHERE titulo = 'Teste';

-- ==========================================
-- 4. CONSULTA DE DADOS (DML - SELECT)
-- ==========================================
SELECT 
    c.id_chamado AS Ticket,
    c.titulo AS Problema,
    c.urgencia AS Prioridade,
    c.status AS Status,
    u.nome AS Solicitante,
    d.nome_departamento AS Setor
FROM Chamados c
INNER JOIN Usuarios u ON c.id_colaborador = u.id_usuario
INNER JOIN Departamentos d ON u.id_departamento = d.id_departamento
ORDER BY c.data_abertura DESC;
