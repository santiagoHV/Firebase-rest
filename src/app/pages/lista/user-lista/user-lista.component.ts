import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../services/rest.service';
import { UsuarioModel } from '../../../models/usuario.model';

@Component({
  selector: 'app-user-lista',
  templateUrl: './user-lista.component.html',
  styleUrls: ['./user-lista.component.css']
})
export class UserListaComponent implements OnInit {

  usuario: UsuarioModel[] = [];
  constructor(private _RestService: RestService) { 
    this._RestService.getAllUsuarios().subscribe((res: UsuarioModel[]) => 
      {
        this.usuario = res;
        console.log(res);
      })
  }

  ngOnInit(): void {
  }

}
