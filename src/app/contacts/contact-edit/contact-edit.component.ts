import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit{
  originalContact!: Contact;
  contact: Contact = new Contact('','','','','','');
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;
  emptyGroup = false;
  invalidContact = false;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {
    }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.id=params['id'];
        if (!this.id){
          this.editMode = false;
          return;
        }
        this.originalContact = this.contactService.getContact(this.id);
        if (!this.originalContact){
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        if (this.contact.group){
          this.groupContacts = JSON.parse(JSON.stringify(this.contact.group))
          // if (this.groupContacts.length < 1){
          //   this.emptyGroup = true;
          // }
        } else{
          this.emptyGroup = true;
        }
        
      }
    )
  }

  onCancel(){
    this.router.navigate(['/contacts']);
  }
  
  onSubmit(f: NgForm){
    let value = f.value;
    console.log(this.groupContacts)
    let newContact = new Contact(value.id,value.name,value.email,value.phone,value.imageUrl,this.groupContacts);
    console.log(this.editMode)
    if (this.editMode){
      this.contactService.updateContact(this.originalContact, newContact);
    } else{
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact){
      this.invalidContact = true;
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      this.invalidContact = true;
      return true;
   }
   for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id) {
        this.invalidContact = true;
        return true;
     }
   }
   this.invalidContact = false;
   return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact){
      
       return;
    }
    this.groupContacts.push(selectedContact);
 }

 
onRemoveItem(index: number) {
  if (index < 0 || index >= this.groupContacts.length) {
     return;
  }
  this.groupContacts.splice(index, 1);
}
  
}
