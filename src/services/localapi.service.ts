import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { alumnos } from 'src/models/alumnos';

@Injectable({
  providedIn: 'root',
})
export class LocalApiService {
  private apiUrl = 'http://192.168.244.234:5000';

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) {}

  getProfesores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/profesores`, this.httpOptions);
  }

  getIdProfesor(user: string): Observable<any> {
    const data = { user: user };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/buscar_profesor`, data, { headers: headers });
  }

  getCursosPorProfesor(profesorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profesores/${profesorId}/cursos`, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Error al obtener los cursos:', error);
        if (error.status === 404) {
          console.log('No tiene cursos');
        }
        throw error;
      })
    );
  }

  getAlumnosPorCurso(profesorId: number, cursoId: number): Observable<alumnos[]> {
    return this.http.get<alumnos[]>(`${this.apiUrl}/profesores/${profesorId}/cursos/${cursoId}/alumnos`, this.httpOptions);
  }

  getProfesorIdPorUsuario(user: string): Observable<number | null> {
    const usuarioBuscado = user;
    const data = { username: usuarioBuscado };

    return this.http.post<any>(`${this.apiUrl}/buscar_profesor`, data).pipe(
      catchError((error) => {
        console.error('Error en la solicitud:', error);
        return new Observable<number | null>();
      })
    );
  }

  getDataUser(user: string): Observable<any> {
    const data = { user };
    return this.http.post<any>(`${this.apiUrl}/usuario`, data).pipe(
      catchError((error) => {
        console.error('Error en la solicitud para obtener el usuario:', error);
        throw error;
      })
    );
  }
}
