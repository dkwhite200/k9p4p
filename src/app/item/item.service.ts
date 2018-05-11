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
    
    //Get Item list from firestore
    this.itemsCollection = this.afs.collection('items');
    this.items = this.itemsCollection.valueChanges();
  }

  //add an item to a collection
  addItem (item: Item) {
    //add item to collection with a missing id attribute
    this.itemsCollection.add(item)
      .then((doc) => {
        //retrieve database id and set to item id
        item.id = doc.id;
        //update the database document
        doc.update(item)
          .then(() => console.log('Item successfully created'))
          .catch((error) => console.log('Error adding id to new item: ', error));
      })
      .catch((error) => console.log('Error in adding item: ', error));
    //auto update list of items
    this.updateItems();
  }

  //update item in database
  updateItem (item: Item) {
    //reset the last updated time
    item.updated = new Date();
    this.itemsCollection.doc(item.id).update(item)
      .then(() => console.log('Item successfully updated'))
      .catch((error) => console.log('Error updating item: ', error));
    //auto update list of items
    this.updateItems();
  }

  //delete an item in databae
  deleteItem (item: Item) {
    this.itemsCollection.doc(item.id).delete()
      .then((doc) => console.log('Item successfully deleted: ', doc))
      .catch((error) => console.log('Error deleting item: ', error));
    //auto update list of items
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
