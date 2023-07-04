import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy{
  messages:Message[] = [];
  subscription!: Subscription

  constructor(private messageService:MessageService){};

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.subscription= this.messageService.messageChangedEvent.subscribe(
      (msg: Message[]) => {
        this.messages = msg
      })
  }

  onAddMessage(message: Message){
    
    this.messages.push(message);
    console.log(this.messages)

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
