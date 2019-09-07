import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Resposta, Paciente, Filtro } from '@shared/models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) { }

  getPacientes(filtros: Filtro[] = []): Observable<Resposta<Paciente>> {
    let params = new HttpParams();
    if (filtros.length > 0) {
      filtros.forEach(filtro => params = params.set(filtro.atributo, filtro.valor));
    }
    console.log({params});
    return this.http.get<Resposta<Paciente>>(this.apiUrl, {params});
  }

  getPaciente(id): Observable<Resposta<Paciente>> {
    return this.http.get<Resposta<Paciente>>(`${this.apiUrl}/${id}`);
  }

  salvaPaciente(paciente: Paciente): Observable<Resposta<Paciente>> {
    return this.http.post<Resposta<Paciente>>(this.apiUrl, paciente);
  }

  deletaPaciente(id): any {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  atualizaPaciente(paciente: Paciente): Observable<Resposta<Paciente>> {
    return this.http.put<Resposta<Paciente>>(`${this.apiUrl}/${paciente.id}`, paciente);
  }

}
