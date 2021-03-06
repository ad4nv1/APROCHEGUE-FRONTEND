import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioLoginDTO } from '../model/UsuarioLoginDTO';
import { Usuario } from '../model/Usuario';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  entrar(usuarioLoginDTO:UsuarioLoginDTO):Observable<UsuarioLoginDTO>{
    return this.http.post<UsuarioLoginDTO>('https://aprochegue.herokuapp.com/usuarios/logar', usuarioLoginDTO)

  }
  cadastrar(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>('https://aprochegue.herokuapp.com/usuarios/cadastrar', usuario)

  }

  atualizar(usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>('https://aprochegue.herokuapp.com/usuarios/atualizar', usuario, this.token)

  }

  getByIdUser(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(`https://aprochegue.herokuapp.com/usuarios/${id}`,this.token)
  }

  deleteUser(id:number){
    return this.http.delete(`https://aprochegue.herokuapp.com/usuarios/${id}`,this.token)
  }

  getAllUser(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>('https://aprochegue.herokuapp.com/usuarios/all', this.token)
  }


  logado(){
    let ok: boolean = false

    if(environment.token != ''){
      ok = true
    }

    return ok

  }
  
}
