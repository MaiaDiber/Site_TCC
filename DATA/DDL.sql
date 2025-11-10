drop database TCC;
create database TCC;
use TCC;

create table Cadastrar (
    id int auto_increment primary key,
    nome_completo varchar(100) not null,
    cpf char(11) not null unique,
    data_nascimento date not null,
    senha varchar(100) not null,
    email varchar(200) not null unique
);

create table Endereco (
    id int auto_increment primary key,
    cep varchar(9) not null,
    rua_aven varchar(255) not null,
    numero_casa varchar(10) not null,
    bairro varchar(200) not null,
    id_cadastro int not null,
    foreign key (id_cadastro) references Cadastrar(id) on delete cascade
);

create table Cadastrar_admin (
    id int auto_increment primary key,
    nome_completo varchar(100) not null,
    cpf char(11) not null unique,
    data_nascimento date not null,
    senha varchar(100) not null,
    email varchar(200) not null unique
);

create table Endereco_admin (
    id int auto_increment primary key,
    cep varchar(9) not null,
    rua_aven varchar(255) not null,
    numero_casa varchar(10) not null,
    bairro varchar(200) not null,
    id_admin int not null,
    foreign key (id_admin) references Cadastrar_admin(id) on delete cascade
);

create table Campanhas (
    id int auto_increment primary key,
    imagem varchar(255),
    nome_campanha varchar(255) not null,
    como_prevenir text,
    descricao text,
    id_admin int,
    foreign key (id_admin) references Cadastrar_admin(id) on delete set null
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
    foreign key (id_admin) references Cadastrar_admin(id) on delete set null
);

create table Unidades_saude (
    id int auto_increment primary key,
    nome_unidade varchar(150) not null,
    endereco varchar(255),
    telefone varchar(20),
    id_admin int,
    foreign key (id_admin) references Cadastrar_admin(id) on delete set null
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
