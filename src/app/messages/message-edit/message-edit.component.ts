import { Component, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  currentSender = '1';
  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('msgText') msgText!: ElementRef;

  constructor(private messageService: MessageService){};

  onSendMessage(){
    const currentSubject = this.subject.nativeElement.value;
    const currentMsg = this.msgText.nativeElement.value;
    const newMessage = new Message('1',currentSubject,currentMsg,this.currentSender);
    this.messageService.addMessage(newMessage);
  }

  onClear(){
    this.subject.nativeElement.value='';
    this.msgText.nativeElement.value='';
  }
}
