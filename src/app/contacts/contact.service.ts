import {Injectable, EventEmitter} from '@angular/core';
  import {Contact} from './contact.model';
  import {MOCKCONTACTS} from './MOCKCONTACTS';

  @Injectable({
    providedIn: 'root'
})
  export class ContactService {
    contactSelectedEvent = new EventEmitter<Contact>();
     contacts: Contact [] =[];

     constructor() {
        this.contacts = MOCKCONTACTS;
     }

     getContacts(): Contact[]{
        return this.contacts.slice();
     }

     getContact(id: string): Contact | null{
        let contact = this.contacts.find(contact => contact.id === id);
        if(contact!=undefined){
            return contact
        }else{
            return null;
        }
     }

  }