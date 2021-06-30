export interface User {
    id: Number;
    username: String;
    pessoa_id: Number;
    roles?: Array<Role>;
    pessoa?: Pessoa;
    favoritos?: Array<Pessoa>;
}

export interface Role {
    id: Number;
    descricao: String;
}

export interface Pessoa {
    id: Number;
    nome: String;
    cpf: String;
    data_nascimento: any;
    foto: any;
    endereco?: Endereco;
    contatos?: Array<Contato>;
}

export interface Cidade {
    id: Number;
    nome: String;
    estado_id: Number;
    estado?: Estado;
}

export interface Estado {
    id: Number;
    nome: String;
    uf: String;
    pais_id: Number;
    pais?: Pais;
}

export interface Pais {
    id: Number;
    nome: String;
}

export interface Endereco {
    id: Number;
    bairro: String;
    logradouro: String;
    numero: String;
    complemento: String;
    cidade_id: Number;
    pessoa_id: Number;
    pessoa?: Pessoa;
    cidade?: Cidade;
}

export interface Contato {
    id: Number;
    valor: String;
    publico: Boolean;
    pessoa_id: Number;
    pessoa?: Pessoa;
    user_id: Number;
    user?: User;
    contato_tipo_id: Number;
    contatoTipo?: ContatoTipo;
    contato_categoria_id: Number;
    contatoCategoria?: ContatoCategoria;
}

export interface ContatoTipo {
    id: Number;
    descricao: String;
}

export interface ContatoCategoria {
    id: Number;
    descricao: String;
}