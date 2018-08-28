import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {

  constructor (private activeModal: NgbActiveModal, private clientService: ClientService) { }

  //create template client
  client: Client = {
    id: '',
    name: '',
    email: '',
    dog_name: '',
    created: new Date(),
    updated: new Date()
  };

  onSubmit (f: NgForm) {
    //creates a number variable from the form input
    this.client.name = f.value.name;
    this.client.email = f.value.email;
    this.client.dog_name = f.value.dogName;
    //add client to database
    this.clientService.addClient(this.client);
    this.activeModal.close('Close click');
  }
}
