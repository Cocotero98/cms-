import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit{
  currentSender!: Contact;
  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('msgText') msgText!: ElementRef;

  constructor(private messageService: MessageService,
              private contactService: ContactService    
    ){};

  ngOnInit(): void {
    // this.contactService.getContacts()
    // this.currentSender = this.contactService.getContact('101');
    // console.log(this.currentSender)
  }

  onSendMessage(){
    this.currentSender = this.contactService.getContact('101');
    console.log(this.currentSender)
    const currentSubject = this.subject.nativeElement.value;
    const currentMsg = this.msgText.nativeElement.value;
    const newMessage = new Message('1',currentSubject,currentMsg, this.currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear(){
    this.subject.nativeElement.value='';
    this.msgText.nativeElement.value='';
  }
}
