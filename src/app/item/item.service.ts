import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { Item } from './item'; 




@Injectable()
export class ItemService {

  //database objects
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor (private afs: AngularFirestore, private route: Router) { 
    
    //Get Item list form firestore
    this.itemsCollection = this.afs.collection('items');
    this.items = this.itemsCollection.valueChanges();
  }

  //add an item to a collection
  addItem (item: Item) {
    console.log(item.id);
    item.updated = new Date();
    this.itemsCollection.add(item)
      .then((doc) => console.log('Item successfully added: ', doc.id))
      .catch((error) => console.error('Error adding item: ', error));
    //auto update item list
    this.updateItems();
  }

  //update item in database
  updateItem (item: Item) {
    console.log(item.id);
    item.updated = new Date();
    this.itemsCollection.doc(item.id).update(item)
      .then((doc) => console.log('Item successfully updated'))
      .catch((error) => console.log('Error updating item: ', error));
    this.updateItems();
  }

  //delete an item in databae
  deleteItem (item: Item) {
    console.log(item.id);
    this.itemsCollection.doc(item.id).delete()
      .then((doc) => console.log('Item successfully deleted: ', doc))
      .catch((error) => console.log('Error deleting item: ', error));
    this.updateItems();
  }

  //update the list of items
  updateItems () {
    this.itemsCollection = this.afs.collection('items');
    this.items = this.itemsCollection.valueChanges();
  }

  //get a list of items as an array[]
  getItemList () {
    //update list before retrieval 
    this.updateItems();
    return this.items;
  }

  //get a specific item using id string
  getItem (id: string): Observable<Item> {
    //gets the doc of the item from id
    const document: AngularFirestoreDocument<Item> = this.itemsCollection.doc(id);
    //returns an updatated item obj 
    return document.valueChanges();
  }
}
