
export class Resposta<T> {
  dados: DadosPaginados<T> | T;
  erros: Erro[];
}

export class DadosPaginados<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export class Erro {
  mensagem: string;
  detalhes: string;
}

export class Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}
export class Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
