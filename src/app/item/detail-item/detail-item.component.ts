import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditItemComponent } from '../edit-item/edit-item.component';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.css']
})
export class DetailItemComponent implements OnInit { 
  constructor (private modalService: NgbModal,
    private itemservice: ItemService,
    private page: ActivatedRoute,
    private route: Router) { }

  item: Item;

  ngOnInit () {
    this.getItem();
  }

  //parses the id from web url and then gets the item from database 
  getItem () {
    const id: string = this.page.snapshot.paramMap.get('id');
    this.itemservice.getItem(id)
      .subscribe((item) => this.item = item);
  }

  goBack () {
    this.route.navigate(['dashboard']);
  }

  //opens the edit view and inputs item data and a formData obj (see edit-item.component.js for formData usage)
  openModal () {
    const modalRef = this.modalService.open(EditItemComponent);
    modalRef.componentInstance.item = this.item;
    modalRef.componentInstance.formData = this.copyItem(this.item);
  }

  deleteItem () {
    this.itemservice.deleteItem(this.item);
    this.goBack();
  }

  //creates and returns a new Item object that is a copy of another (not a reference as would happen with obj = obj)
  copyItem (item: Item): Item {
    var copy: Item;
    copy = {
      id: item.id,
      name: item.name,
      upc: item.upc,
      qty: item.qty,
      created: item.created,
      updated: item.updated
    }
    return copy;
  }
}
