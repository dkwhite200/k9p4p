import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {

  constructor (private activeModal: NgbActiveModal, private clientService: ClientService) { }
  
  //pulls in client data from clients page, and uses formData for 2 way data binding.
  //This allows changes on the edit view without changes on details view.
  @Input() client; formData;

  onSubmit () {
    this.client = this.formData;
    //update with client service
    this.clientService.updateClient(this.client);
    //close the modal
    this.activeModal.close('Close click');
  }

}
