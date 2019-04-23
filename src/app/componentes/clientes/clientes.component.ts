import { Component, OnInit } from '@angular/core';
import {ClienteServicio} from 'src/app/servicios/clientes.service';
import {Cliente} from 'src/app/modelo/cliente.model';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
	clientes: Cliente[];
  constructor(private clientesServicio: ClienteServicio) { }

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
}
