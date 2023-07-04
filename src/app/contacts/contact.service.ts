import {Injectable, EventEmitter} from '@angular/core';
  import {Contact} from './contact.model';
  import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

  @Injectable({
    providedIn: 'root'
})
  export class ContactService {
   contactsListChangedEvent = new Subject<Contact[]>();
   // contactChangedEvent = new EventEmitter<Contact[]>();
    contactSelectedEvent = new EventEmitter<Contact>();
     contacts: Contact [] =[];
     maxContactId = 0;

     constructor(private http: HttpClient) {
        // this.contacts = MOCKCONTACTS;
        this.contacts = this.getContacts()
        this.maxContactId = this.getMaxId();
     }

     getContacts(): Contact[]{
        this.http.get<Contact[]>('http://localhost:3000/contacts/')
        .subscribe(
            // success method
            (contacts: Contact[]) => {
               this.contacts = contacts
               this.maxContactId = this.getMaxId();
              // sort the list of documents
              this.contacts.sort((a,b)=>a.name.localeCompare(b.name));
              // /emit the next document list change event
              this.contactsListChangedEvent.next(this.contacts.slice());
            }, error=> {
                console.log(error);
            }
        )
        return this.contacts.slice();
     }

     storeContacts(){
        let contactsString= JSON.stringify(this.contacts);
        this.http.put<Contact[]>(
            'http://localhost:3000/contacts/',
            contactsString,
            {
                headers: new HttpHeaders({
                    'Content-type':'application/json'
                })
            }).subscribe(()=>{
                this.contactsListChangedEvent.next(this.contacts.slice())
            })
     }

     getContact(id: string): Contact {
      // console.log(id)
      // console.log(this.contacts)
      // id='7'
      console.log(this.contacts)
        let contact = this.contacts.find(contact => contact.id === id);
        if(contact!=undefined){
          console.log(contact)
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
      if(!newContact){
          return
      }
      newContact.id= "";
      const headers = new HttpHeaders({'Content-Type': 'application/json'});

      this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
        newContact,
        {headers: headers})
        .subscribe(
            (responseData) => {
                // add new document to documents
                this.contacts.push(responseData.contact);
                this.contactsListChangedEvent.next(this.contacts.slice());
              }
        )

    //   this.contacts.push(newContact);
    //   let documentsListClone= this.contacts.slice();
    // //   this.contactsListChangedEvent.next(documentsListClone);
    //   this.storeContacts();
   };

   updateContact(originalContact: Contact, newContact: Contact){
      if(!originalContact || !newContact){
          return
      };
      let pos= this.contacts.indexOf(originalContact);
      if(pos<0){
          return
      }
      newContact.id=originalContact.id;
    //   this.contacts[pos] = newContact;
    console.log(newContact)
    const headers =  new HttpHeaders({'Content-Type': 'application/json'});
      this.http.put('http://localhost:3000/contacts/' + originalContact.id, newContact, { headers:headers })
      .subscribe(()=>{
        this.contacts[pos] = newContact;
        this.contactsListChangedEvent.next(this.contacts.slice())
      })



    //   let contactsListClone = this.contacts.slice()
    // //   this.contactsListChangedEvent.next(contactsListClone);
    // this.storeContacts();
};

  deleteContact(contact: Contact){
      if(contact === undefined || contact === null){
          return
      }
      let pos= this.contacts.indexOf(contact);
      if (pos < 0){
          return
      }

      this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(()=>{
        this.contacts.splice(pos,1);
        this.contactsListChangedEvent.next(this.contacts.slice())
      })

      
    //   let contactsListClone = this.contacts.slice();
    //   this.contactsListChangedEvent.next(contactsListClone);
    // this.storeContacts();
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