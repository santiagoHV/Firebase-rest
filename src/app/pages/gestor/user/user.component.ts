import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../models/usuario.model';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { RestService } from '../../../services/rest.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  id = null;
  error = false;

  constructor(private _activatedRoute: ActivatedRoute, private _RestService: RestService) {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    if(this.id == 'new'){
      this.usuario.id_usuario = null;
    }else{
      this._RestService.getUsuario(this.id).subscribe((res:UsuarioModel) => this.usuario = res)
      this.usuario.id_usuario = this.id;
    }
    console.log(this._activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
  }

 guardar(form: NgForm){
   console.log(form);
   
   if (form.invalid){
      this.error = true;
      return;
    }

   Swal.fire({
    title: 'Espere',
    icon: 'info',
    text: 'Guardando Información',
    allowOutsideClick: false
    });

   Swal.showLoading();
   

   let peticion: Observable<any>

   if (this.usuario.id_usuario){
      this.error = false;
      peticion= this._RestService.putUsuario(this.usuario);
      
    }else{
      this.error = false;
      peticion= this._RestService.postUsuario(this.usuario);
    }

   peticion.subscribe(res =>{
      Swal.fire({
            title: this.usuario.Nombre + ' ' + this.usuario.Apellido,
            icon: 'success',
            text: 'Información guardada correctamente',
          });
        })
 }
}
