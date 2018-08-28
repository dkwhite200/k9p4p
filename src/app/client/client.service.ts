import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { Client } from './client'; 


@Injectable()
export class ClientService {

  //database objects
  clientsCollection: AngularFirestoreCollection<Client>;
  clients: Observable<Client[]>;

  constructor (private afs: AngularFirestore, private route: Router) {

    //Get Client list from firestore
    this.clientsCollection = this.afs.collection('clients');
    this.clients = this.clientsCollection.valueChanges();
  }

  //add an client to a collection
  addClient (client: Client) {
    //add client to collection with a missing id attribute
    this.clientsCollection.add(client)
      .then((doc) => {
        //retrieve database id and set to client id
        client.id = doc.id;
        //update the database document
        doc.update(client)
          .then(() => console.log('Client successfully created'))
          .catch((error) => console.log('Error adding id to new client: ', error));
      })
      .catch((error) => console.log('Error in adding client: ', error));
    //auto update list of clients
    this.updateClients();
  }

  //update client in database
  updateClient (client: Client) {
    //reset the last updated time
    client.updated = new Date();
    this.clientsCollection.doc(client.id).update(client)
      .then(() => console.log('Client successfully updated'))
      .catch((error) => console.log('Error updating client: ', error));
    //auto update list of clients
    this.updateClients();
  }

  //delete an client in databae
  deleteClient (client: Client) {
    this.clientsCollection.doc(client.id).delete()
      .then((doc) => console.log('Client successfully deleted: ', doc))
      .catch((error) => console.log('Error deleting client: ', error));
    //auto update list of clients
    this.updateClients();
  }

  //update the list of clients
  updateClients () {
    this.clientsCollection = this.afs.collection('clients');
    this.clients = this.clientsCollection.valueChanges();
  }

  //get a list of clients as an array[]
  getClientList () {
    //update list before retrieval 
    this.updateClients();
    return this.clients;
  }

  //get a specific client using id string
  getClient (id: string): Observable<Client> {
    //gets the doc of the client from id
    const document: AngularFirestoreDocument<Client> = this.clientsCollection.doc(id);
    //returns an updatated client obj 
    return document.valueChanges();
  }
}
