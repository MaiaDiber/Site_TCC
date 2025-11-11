DROP DATABASE IF EXISTS TCC;
CREATE DATABASE TCC;
USE TCC;


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


select * from Cadastrar;


INSERT INTO Cadastrar 
(nome_completo, cpf, data_nascimento, senha, email, tipo, status_admin)
VALUES 
('Admin Principal', '056.370.503-40', '1990-01-01', MD5('senha123'), 'gustavomaiaxre@gmail.com', 'admin', 'aprovado'),
('Carlão Silva do Pinto', '507.501.296-20', '1980-05-22', MD5('pinto99'), 'carlaodopinto@gmail.com', 'paciente', 'aprovado'),
('Gustavo Maia', '305.905.892-40', '2010-09-02', MD5('abc123@frei'), 'ra50350929840@acaonsfatima.org.br', 'paciente', 'aprovado');


CREATE TABLE Endereco (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cep VARCHAR(10) NOT NULL,
    rua_aven VARCHAR(255) NOT NULL,
    numero_casa VARCHAR(8) NOT NULL,
    bairro VARCHAR(200) NOT NULL,
    id_cadastro INT,
    FOREIGN KEY (id_cadastro) REFERENCES Cadastrar(id) ON DELETE CASCADE
);

CREATE TABLE Solicitacoes_Admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    motivo_solicitacao TEXT NOT NULL,
    status ENUM('pendente', 'aprovado', 'recusado') DEFAULT 'pendente',
    data_solicitacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_resposta TIMESTAMP NULL,
    admin_responsavel INT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Cadastrar(id) ON DELETE CASCADE,
    FOREIGN KEY (admin_responsavel) REFERENCES Cadastrar(id)
);


create table Campanhas (
    id int auto_increment primary key,
    imagem varchar(255),
    nome_campanha varchar(255) not null,
    como_prevenir text,
    descricao text,
    id_admin int,
    foreign key (id_admin) references Cadastrar(id) on delete set null
);

create table Medicamentos (
    id int auto_increment primary key,
    nome_produto varchar(255) not null,
    estoque_produto int default 0,
    numero_registro varchar(50),
    cnpj varchar(20),
    razao_social varchar(255),
    data_registro date,
    situacao varchar(50),
    id_admin int,
    foreign key (id_admin) references Cadastrar(id) on delete set null
);

create table Unidades_saude (
    id int auto_increment primary key,
    nome_unidade varchar(150) not null,
    endereco varchar(255),
    telefone varchar(20),
    id_admin int,
    foreign key (id_admin) references Cadastrar(id) on delete set null
);

create table Estoques (
    id int auto_increment primary key,
    id_medicamento int not null,
    id_unidade int not null,
    quantidade int default 0,
    foreign key (id_medicamento) references Medicamentos(id) on delete cascade,
    foreign key (id_unidade) references Unidades_saude(id) on delete cascade
);

create table Medicos (
    id int auto_increment primary key,
    nome_medico varchar(150) not null,
    especialidade varchar(100) not null,
    horario_disponivel varchar(100),
    id_unidade int,
    foreign key (id_unidade) references Unidades_saude(id) on delete set null
);

create table Consultas (
    id int auto_increment primary key,
    id_paciente int not null,
    id_medico int not null,
    data_consulta date not null,
    hora_consulta time not null,
    status enum('agendada', 'concluída', 'cancelada') default 'agendada',
    foreign key (id_paciente) references Cadastrar(id) on delete cascade,
    foreign key (id_medico) references Medicos(id) on delete cascade
);

create table Historico_consultas (
    id int auto_increment primary key,
    id_consulta int not null,
    data_consulta date,
    hora_consulta time,
    status_final enum('concluída', 'cancelada'),
    observacoes text,
    data_registro timestamp default current_timestamp,
    foreign key (id_consulta) references Consultas(id) on delete cascade
);


CREATE VIEW vw_solicitacoes_pendentes AS
SELECT 
    s.id AS id_solicitacao,
    s.id_usuario,
    c.nome_completo,
    c.cpf,
    c.email,
    c.data_nascimento,
    s.motivo_solicitacao,
    s.data_solicitacao,
    s.status
FROM Solicitacoes_Admin s
INNER JOIN Cadastrar c ON s.id_usuario = c.id
WHERE s.status = 'pendente'
ORDER BY s.data_solicitacao DESC;


CREATE VIEW vw_usuarios_completo AS
SELECT 
    c.id,
    c.nome_completo,
    c.cpf,
    c.email,
    c.tipo,
    c.status_admin,
    e.cep,
    e.rua_aven,
    e.numero_casa,
    e.bairro
FROM Cadastrar c
LEFT JOIN Endereco e ON c.id = e.id_cadastro;


SHOW TABLES;

