import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages:Message[] = [
    {id:2,subject:'test',msgText:'this is a test',sender:'test sender'},
    {id:2,subject:'test',msgText:'this is a test',sender:'test sender'},
    {id:2,subject:'test',msgText:'this is a test',sender:'test sender'}
  ]

  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
