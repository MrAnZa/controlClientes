import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ClienteServicio} from 'src/app/servicios/clientes.service';
import {Cliente} from 'src/app/modelo/cliente.model';
import {FlashMessagesService} from 'angular2-flash-messages';
import {NgForm} from '@angular/forms';
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
  @ViewChild("clienteForm") clienteForm: NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

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
      this.clientesServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }
  private cerrarModal(){
    this.botonCerrar.nativeElement.click()
  }
}
