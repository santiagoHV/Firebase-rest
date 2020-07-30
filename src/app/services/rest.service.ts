import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  db_url = 'https://fir-1-4b29e.firebaseio.com/';

  constructor(private _HttpClient: HttpClient) { }

  getAllUsuarios(){
    return this._HttpClient.get(this.db_url + 'Usuarios.json').pipe(map(this.getAllUsuariosArreglo));
  }

  private getAllUsuariosArreglo(usuario: object){
    const usuarios: UsuarioModel[] = [];
    if(usuario === null){
      return[];
    }
    Object.keys(usuario).forEach(key =>{
      const usuario2: UsuarioModel = usuario[key];
      usuario2.id_usuario = key;
      usuarios.push(usuario2);
    });
    return usuarios; 
  }

  getUsuario(id){
    console.log(this.db_url + 'Usuarios/' + id + '.json');
    return this._HttpClient.get(this.db_url + 'Usuarios/' + id + '.json');
  }
  postUsuario(usuario : UsuarioModel){
    return this._HttpClient.post(this.db_url + 'Usuarios/.json', usuario).pipe(
      map((res : any) =>{
        usuario.id_usuario = res.name;
        return usuario;
      })
    );
  }
  
  putUsuario(usuario: UsuarioModel){
    const usuarioTemporal = {
      ...usuario
    }
    delete usuarioTemporal.id_usuario;
    return this._HttpClient.put(this.db_url + 'Usuarios/' + usuario.id_usuario + '.json', usuarioTemporal);
  }
  
}
