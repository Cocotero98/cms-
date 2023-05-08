import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent {
  currentSender = 'Agustin';
  @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('msgText') msgText!: ElementRef;

  onSendMessage(){
    const currentSubject = this.subject.nativeElement.value;
    const currentMsg = this.msgText.nativeElement.value;
    const newMessage = new Message(1,currentSubject,currentMsg,this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear(){
    this.subject.nativeElement.value='';
    this.msgText.nativeElement.value='';
  }
}
