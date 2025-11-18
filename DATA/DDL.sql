DROP DATABASE IF EXISTS TCC;
CREATE DATABASE TCC;
USE TCC;

-- Tabelas base
CREATE TABLE Cadastrar (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_completo VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    tipo ENUM('paciente', 'admin') DEFAULT 'paciente',
    status_admin ENUM('pendente', 'aprovado', 'recusado') DEFAULT 'aprovado',
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resetToken VARCHAR(255) NULL,
    resetExpires DATETIME NULL
);

INSERT INTO Cadastrar (nome_completo, cpf, data_nascimento, senha, email, tipo, status_admin)
VALUES 
('Admin Principal', '056.370.503-40', '1990-01-01', MD5('senha123'), 'gustavomaiaxre@gmail.com', 'admin', 'aprovado'),
('Carlão Silva do Pinto', '507.501.296-20', '1980-05-22', MD5('pinto99'), 'carlaodopinto@gmail.com', 'paciente', 'aprovado');

CREATE TABLE Unidades_saude (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_unidade VARCHAR(150) NOT NULL,
    endereco VARCHAR(255),
    telefone VARCHAR(20),
    id_admin INT,
    FOREIGN KEY (id_admin) REFERENCES Cadastrar(id) ON DELETE SET NULL
);

-- UBS de exemplo
INSERT INTO Unidades_saude (nome_unidade, endereco, telefone, id_admin)
VALUES
('UBS Centro', 'Rua Central, 123', '(11) 1111-1111', 1),
('UBS Norte', 'Rua Norte, 456', '(11) 2222-2222', 1),
('UBS Sul', 'Rua Sul, 789', '(11) 3333-3333', 1);

CREATE TABLE Medicamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_produto VARCHAR(255) NOT NULL,
    estoque_produto INT DEFAULT 0,
    numero_registro VARCHAR(50),
    cnpj VARCHAR(20),
    razao_social VARCHAR(255),
    data_registro DATE,
    situacao VARCHAR(50),
    id_admin INT,
    FOREIGN KEY (id_admin) REFERENCES Cadastrar(id) ON DELETE SET NULL
);

CREATE TABLE Estoques (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_medicamento INT NOT NULL,
    id_unidade INT NOT NULL,
    quantidade INT DEFAULT 0,
    FOREIGN KEY (id_medicamento) REFERENCES Medicamentos(id) ON DELETE CASCADE,
    FOREIGN KEY (id_unidade) REFERENCES Unidades_saude(id) ON DELETE CASCADE
);

-- Configurar charset para suportar caracteres especiais
ALTER DATABASE TCC CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE Medicamentos CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE Unidades_saude CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE Estoques CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE Cadastrar CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE Medicamentos ADD COLUMN data_validade DATE AFTER data_registro;
------------------------------------------------------------

SELECT nome_produto, data_validade, estoque_produto 
FROM Medicamentos 
WHERE data_validade IS NOT NULL 
LIMIT 10;

Select * from medicamentos;

SELECT 
     nome_produto, 
     data_registro, 
     data_validade
 FROM Medicamentos 
 WHERE data_validade IS NOT NULL 
 LIMIT 10;
 
SELECT COUNT(*) as total_medicamentos FROM Medicamentos;
SELECT COUNT(*) as com_estoque FROM Medicamentos WHERE estoque_produto > 0;

SELECT 
    m.nome_produto,
    m.estoque_produto as estoque_total,
    u.nome_unidade,
    e.quantidade
FROM Medicamentos m
LEFT JOIN Estoques e ON m.id = e.id_medicamento
LEFT JOIN Unidades_saude u ON e.id_unidade = u.id
WHERE m.estoque_produto > 0
LIMIT 10;

SELECT 
    nome_produto, 
    data_registro, 
    data_validade
FROM Medicamentos 
WHERE data_validade >= '2026-01-01'
LIMIT 100;

SHOW VARIABLES LIKE 'character_set%';
SHOW VARIABLES LIKE 'collation%';

SET SQL_SAFE_UPDATES = 0;
UPDATE Medicamentos 
SET razao_social = 
    REPLACE(
    REPLACE(
    REPLACE(
    REPLACE(
    REPLACE(
    REPLACE(
        razao_social,
        '�', 'Ú'),
    'Ã¡', 'á'),
    'Ã£', 'ã'),
    'Ã©', 'é'),
    'Ã³', 'ó'),
    'Ãº', 'ú')
WHERE razao_social REGEXP '[�Ã]';
SET SQL_SAFE_UPDATES = 1;

UPDATE Medicamentos 
SET estoque_produto = FLOOR(RAND() * 0) -- 0 a 10
ORDER BY id desc
LIMIT 10;

SET NAMES 'utf8mb4';


SELECT nome_produto, estoque_produto
FROM Medicamentos 
WHERE estoque_produto BETWEEN 0 AND 1;