import { Component, OnInit } from '@angular/core';
import {ClienteServicio} from 'src/app/servicios/clientes.service';
import {Cliente} from 'src/app/modelo/cliente.model';
import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
	clientes: Cliente[];

  cliente: Cliente={
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
    }

  constructor(private clientesServicio: ClienteServicio,
              private flashMessages: FlashMessagesService) { }

  ngOnInit() {
  	this.clientesServicio.getclientes().subscribe(
  		clientes => {
  			this.clientes=clientes
  		}
  		);
  }

  getSaldoTotal(){
    let saldoTotal: number =0;
    if(this.clientes != null){
      this.clientes.forEach(cliente =>{
        saldoTotal+= cliente.saldo;
      })
    }
  return saldoTotal;
  }
  agregar({value,valid}: {value: Cliente, valid: boolean}){
    if(!valid){
      this.flashMessages.show('Por Favor LLena el Formulario Correctamente',{
        cssClass: 'alert-danger',timeout:4000
      });
    }else{
      
    }
  }
}
