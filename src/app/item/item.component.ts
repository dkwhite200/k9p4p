import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from './item.service';
import { Item } from './item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor (private itemservice: ItemService, private route: Router) { }

  items: Item[];
  ngOnInit () {
    this.itemservice.getItemList()
      .subscribe((items) => this.items = items);
  }

  goDetials (item: Item) {
    const id = item.id;
    this.route.navigate([`detail-item/${id}`]);
  }

}
