import {Injectable, EventEmitter} from '@angular/core';
  import {Contact} from './contact.model';
  import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';

  @Injectable({
    providedIn: 'root'
})
  export class ContactService {
   contactsListChangedEvent = new Subject<Contact[]>();
   contactChangedEvent = new EventEmitter<Contact[]>();
    contactSelectedEvent = new EventEmitter<Contact>();
     contacts: Contact [] =[];
     maxContactId = 0;

     constructor() {
        this.contacts = MOCKCONTACTS;
        this.maxContactId = this.getMaxId();
     }

     getContacts(): Contact[]{
        return this.contacts.slice();
     }

     getContact(id: string): Contact {
        let contact = this.contacts.find(contact => contact.id === id);
        if(contact!=undefined){
            return contact
        }else{
            return this.contacts[0];
        }
     }

   //   deleteContact(contact: Contact) { 
   //    if(!contact){
   //       return;
   //    }
   //    const pos= this.contacts.indexOf(contact);
   //    if (pos<0){
   //       return;
   //    }
   //    this.contacts.splice(pos,1);
   //    this.contactChangedEvent.emit(this.contacts.slice());
   //   }

   addContact(newContact: Contact){
      if(newContact===undefined || newContact === null){
          return
      }
      this.maxContactId++;
      newContact.id= this.maxContactId.toString();
      this.contacts.push(newContact);
      let documentsListClone= this.contacts.slice();
      this.contactsListChangedEvent.next(documentsListClone);
   };

   updateContact(originalContact: Contact, newContact: Contact){
      if(originalContact===undefined||
         originalContact===null||
         newContact===undefined||
         newContact===null){
          return
      };
      let pos= this.contacts.indexOf(originalContact);
      if(pos<0){
          return
      }
      newContact.id=originalContact.id;
      this.contacts[pos] = newContact;
      let contactsListClone = this.contacts.slice()
      this.contactsListChangedEvent.next(contactsListClone);
   };

  deleteContact(contact: Contact){
      if(contact === undefined || contact === null){
          return
      }
      let pos= this.contacts.indexOf(contact);
      if (pos < 0){
          return
      }
      this.contacts.splice(pos,1);
      let contactsListClone = this.contacts.slice();
      this.contactsListChangedEvent.next(contactsListClone);
  } 

  
  getMaxId(): number {
      let maxId = 0;
      for(let contact of this.contacts){
          let currentId = +contact.id;
          if(currentId > maxId){
              maxId = currentId
          }
      }
      return maxId;
  }

  }