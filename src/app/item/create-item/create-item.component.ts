import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent {

  constructor (private activeModal: NgbActiveModal, private itemService: ItemService) { }
  
  //create template item
  item: Item = {
    id: '',
    name: '',
    upc: '',
    qty: 0,
    created: new Date(),
    updated: new Date()
  };

  onSubmit (f: NgForm) {
    //creates a number variable from the form input
    var qty = +f.value.qty;
    //check if less than 0
    if (qty < 0) { this.item.qty = 0; }
    else { this.item.qty = qty }
    this.item.name = f.value.name;
    this.item.upc = f.value.upc;
    //add item to database
    this.itemService.addItem(this.item);
    this.activeModal.close('Close click');
  }
}
