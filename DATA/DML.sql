create table Cadastrar(
id int primary key auto_increment,
nome_completo varchar(100) not null,
cpf varchar(100) not null,
data_nascimento date not null,
senha varchar(100) not null,
email varchar(200) not null,
tipo enum('Paciente', 'Adm') default 'Paciente',
id_endereco int not null,
id_campanha int not null,
foreign key (id_endereco) references Endereco(id),
foreign key (id_campanha) references Campanhas(id)
);

create table Endereco(
id int primary key auto_increment,
cep varchar(10) not null,
rua_aven varchar(255) not null,
numero_casa varchar(8) not null,
bairro varchar(200) not null
);

create table Campanhas(
id int primary key auto_increment,
imagem varchar(255),
nome_campanha varchar(255),
como_prevenir varchar(255),
descricao varchar(255)
);