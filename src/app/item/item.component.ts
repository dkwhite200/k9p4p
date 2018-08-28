import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from './item.service';
import { Item } from './item';
import { CreateItemComponent } from './create-item/create-item.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor (private modalService: NgbModal, private itemservice: ItemService, private route: Router) { }

  items: Item[];
  
  //get items upon page navigation
  ngOnInit () {
    this.itemservice.getItemList()
      .subscribe((items) => this.items = items);
  }

  //go to details url of the specific item
  goDetails (item: Item) {
    this.route.navigate([`detail-item/${item.id}`]);
  }

  //opens a modal to create an item
  openCreate () {
    const modalRef = this.modalService.open(CreateItemComponent);
  }

}
