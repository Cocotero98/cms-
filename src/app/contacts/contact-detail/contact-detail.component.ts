import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit{
  // contacts: Contact[] ;
  contact!:Contact;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute
            ){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.contact = this.contactService.getContact(params['id']);
      } 
    )
  }

  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['contacts']);
  }

}
