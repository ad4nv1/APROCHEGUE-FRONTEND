import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLoginDTO } from '../model/UsuarioLoginDTO';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UsuarioLoginDTO = new UsuarioLoginDTO()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.userLogin).subscribe((resp: UsuarioLoginDTO)=>{
      this.userLogin = resp
      environment.token = this.userLogin.token
      environment.foto = this.userLogin.foto
      environment.nome = this.userLogin.nome
      environment.id = this.userLogin.id
      environment.tipo = this.userLogin.tipo

      console.log(environment.token)
      console.log(environment.nome)
      console.log(environment.foto)
      console.log(environment.id)

      this.router.navigate(['/inicio'])
    }, erro => {
      if(erro.status == 500 || erro.status == 401){
        alert('Usuário ou senha estão incorretos!')
      }

    })
  
  }
}