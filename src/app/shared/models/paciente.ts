

export class Paciente {
  id: number;
  nomeCrianca: string;
  nomeResponsavel: string;
  dataNascimento: any;
  sexo: string;
  endereco: Endereco;
  planoSaude: any;
  telefones: Telefone[];
}

export class Endereco {
  id: number;
  cep: string;
  rua: string;
  bairro: string;
  numero: number;
  complemento: string;
  cidade: string;
  estado: string;
}

export class Telefone {
  id: number;
  tipo: string;
  numero: string;
  nomeContato: string;
}
