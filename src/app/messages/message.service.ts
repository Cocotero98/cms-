import { MOCKMESSAGES } from "./MOCKMESSAGES";
import { Message } from "./message.model";
import { Injectable, EventEmitter } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class MessageService { 
    messageChangedEvent = new EventEmitter<Message[]>();
    messages: Message[]= [];

    constructor(){
        this.messages = MOCKMESSAGES;
    }

    getMessages(){
        return this.messages.slice();
    }
    
    getMessage(id: string): Message | null{
        let message = this.messages.find(msg => msg.id === id);
        if(message!=undefined){
            return message;
        } else{return null}
    }

    addMessage(message: Message){
        this.messages.push(message);
        this.messageChangedEvent.emit(this.messages.slice());
    }

}