import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { EditClientComponent } from '../edit-client/edit-client.component';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.css']
})
export class DetailClientComponent implements OnInit {

  constructor (private modalService: NgbModal,
    private clientService: ClientService,
    private page: ActivatedRoute,
    private route: Router) { }

  client: Client;

  ngOnInit () {
    this.getClient();
  }

  //parse id from web url and then gets the client from database
  getClient () {
    const id: string = this.page.snapshot.paramMap.get('id');
    this.clientService.getClient(id)
      .subscribe((client) => this.client = client);
  }

  goBack () {
    this.route.navigate(['dashboard']);
  }

  //opens the edit view and inputs client data and a formData obj (see edit-client.component.js for formData usage)
  openEdit () {
    const modalRef = this.modalService.open(EditClientComponent);
    modalRef.componentInstance.client = this.client;
    modalRef.componentInstance.formData = this.copyClient(this.client);
  }

  deleteClient () {
    this.clientService.deleteClient(this.client);
    this.goBack();
  }

  //creates and returns a new Client object that is a copy of another (not a reference as would happen with obj = obj)
  copyClient (client: Client): Client {
    var copy: Client;
    copy = {
      id: client.id,
      name: client.name,
      email: client.email,
      dog_name: client.dog_name,
      created: client.created,
      updated: client.updated
    }
    return copy;
  }
}
