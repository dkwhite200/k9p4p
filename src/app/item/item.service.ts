import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { Item } from './item'; 




@Injectable()
export class ItemService {

  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor (private afs: AngularFirestore, private route: Router) { 
    
    //Get Item list form firestore
    this.itemsCollection = this.afs.collection('items');
    this.items = this.itemsCollection.valueChanges();
  }

  setItem (item: Item) {
    item.updated = new Date();
    this.itemsCollection.doc(item.upc).set(item)
      .then((doc) => console.log('Item successfully written'))
      .catch((error) => console.error('Error writting item: ', error));
    this.updateItems();
  }

  deleteItem (item: Item) {
    this.itemsCollection.doc(item.id).delete();
    this.updateItems();
  }

  updateItems () {
    this.itemsCollection = this.afs.collection('items');
    this.items = this.itemsCollection.valueChanges();
  }

  getItemList () {
    this.updateItems();
    return this.items;
  }

  getItem (id: string): Observable<Item> {
    this.updateItems();
    const document: AngularFirestoreDocument<Item> = this.itemsCollection.doc(id);
    return document.valueChanges();
  }
}
