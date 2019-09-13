import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subject, Subscription } from 'rxjs';
import {
  finalize,
  debounceTime,
  map,
  distinctUntilChanged,
  tap
} from 'rxjs/operators';
import { MessageService } from 'primeng/components/common/messageservice';

import { Paciente, DadosPaginados, Filtro } from '@shared/models';
import { PacienteService } from './../services/paciente.service';

class Coluna {
  constructor(public atributo: string, public cabecalho: string) {}
}

@Component({
  selector: 'app-paciente-lista',
  templateUrl: './paciente-lista.component.html',
  styleUrls: ['./paciente-lista.component.css']
})
export class PacienteListaComponent implements OnInit, OnDestroy {
  colunas: Coluna[];
  pacientes: Paciente[] = [];
  paciente: Paciente = null; // selecao da tabela

  qntTotal = 0;
  qntLinhas = 5;
  pagina = 0;

  loading = false;
  exibirFiltros = false;

  filtrosTabela = new Map<string, Filtro>();
  filtrosSubject = new Subject<string>();
  subFiltroSubject: Subscription;

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private msgService: MessageService
  ) {}

  ngOnInit() {
    this.colunas = [
      new Coluna('id', 'ID'),
      new Coluna('nomeCrianca', 'Criança'),
      new Coluna('sexo', 'Sexo'),
      new Coluna('dataNascimento', 'Data de Nascimento'),
      new Coluna('nomeResponsavel', 'Responsável')
    ];
    this.buscaPacientes();
    this.subFiltroSubject = this.filtrosSubject
      .pipe(
        debounceTime(600),
        map(valor => valor.trim()),
        distinctUntilChanged(),
        tap(valor => {
          this.pagina = 0; // qnd buscar colocar na primeira pagina da busca
          console.log(`busca por ${valor}`);
        })
      )
      .subscribe(v => {
        console.log('chamou');
        this.buscaPacientes();
      });
  }

  ngOnDestroy() {
    this.subFiltroSubject.unsubscribe();
  }

  private buscaPacientes() {
    this.loading = true;
    this.pacienteService
      .getPacientes(this.montaFiltros())
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(resposta => {
        console.log(resposta);
        const dados = resposta.dados as DadosPaginados<Paciente>;

        this.qntTotal = dados.totalElements;
        this.qntLinhas = dados.size;

        this.pacientes = dados.content;
      });
  }

  novoPaciente() {
    this.router.navigate(['/pacientes/novo']);
  }
  alterarPaciente() {
    this.router.navigate(['/pacientes', this.paciente.id]);
  }

  filtro(valor, atributo) {
    // console.log({ valor, atributo });
    if (valor === null || valor === '') {
      this.filtrosTabela.delete(atributo);
    } else {
      this.filtrosTabela.set(atributo, new Filtro(atributo, valor));
    }
    this.filtrosSubject.next(valor);
  }
  toggleFiltros() {
    this.exibirFiltros = !this.exibirFiltros;
    this.filtrosTabela.clear();
  }

  paginacao(event) {
    if (event.page !== this.pagina || this.qntLinhas !== event.rows) {
      this.qntLinhas = event.rows;
      this.pagina = event.page;
      this.buscaPacientes();
    }
  }
  montaFiltros(): Filtro[] {
    const filtros: Filtro[] = [];

    filtros.push(new Filtro('page', this.pagina.toString()));
    filtros.push(new Filtro('size', this.qntLinhas.toString()));

    this.filtrosTabela.forEach(v => filtros.push(v));

    return filtros;
  }

  removerPaciente() {
    this.msgService.add({
      id: 'remove',
      key: 'confirm',
      severity: 'warn',
      summary: 'Remover Paciente?',
      detail: `${this.paciente.nomeCrianca} será removido!`
    });
  }

  onReject() {
    this.msgService.clear('confirm');
  }
  onConfirm() {
    this.msgService.clear('confirm');
    this.msgService.add({
      key: 'process',
      severity: 'info',
      detail: 'Deletando!',
      closable: false
    });
    this.pacienteService
      .deletaPaciente(this.paciente.id)
      .pipe(finalize(() => this.msgService.clear('process')))
      .subscribe(resposta => {
        this.msgService.add({
          key: 'process',
          severity: 'success',
          detail: `${this.paciente.nomeCrianca} deletado!`
        });
        this.buscaPacientes();
      });
  }
}
