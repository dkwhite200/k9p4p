import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from './client.service';
import { Client } from './client';
import { CreateClientComponent } from './create-client/create-client.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor (private modalService: NgbModal, private clientservice: ClientService, private route: Router) { }
  
  clients: Client[];

  //get clients upon page navigation
  ngOnInit () {
    this.clientservice.getClientList()
      .subscribe((clients) => this.clients = clients);
  }

  //go to details url of the specific client
  goDetails (client: Client) {
    this.route.navigate([`detail-client/${client.id}`]);
  }

  //opens a modal to create a client
  openCreate () {
    const modalRef = this.modalService.open(CreateClientComponent);
  }

}
