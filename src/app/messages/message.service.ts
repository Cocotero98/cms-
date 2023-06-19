import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Message } from "./message.model";
import { Injectable, EventEmitter } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class MessageService { 
    messageChangedEvent = new EventEmitter<Message[]>();
    messages: Message[]= [];
    maxMessageId: number=this.getMaxId();

    constructor(private http:HttpClient){
    }

    getMaxId(): number {
        let maxId = 0;
        for(let mes of this.messages){
            let currentId = +mes.id;
            if(currentId > maxId){
                maxId = currentId
            }
        }
        return maxId;
    }

    getMessages(){
        this.http.get<Message[]>('https://cmsagag-default-rtdb.firebaseio.com/messages.json')
            .subscribe(
                (messages:Message[])=>{
                    this.messages = messages;
                    this.maxMessageId = this.getMaxId();
                    this.messageChangedEvent.next(this.messages.slice())
                }, error => {
                console.log(error)
                }
            )
        return this.messages.slice();
    }

    storeMessages(){
        let messagesString = JSON.stringify(this.messages);
        this.http.put<Message[]>(
            'https://cmsagag-default-rtdb.firebaseio.com/messages.json',
            messagesString,
            {headers: new HttpHeaders({
                'Content-type':'application/json'
            })})
            .subscribe(()=>{
                this.messageChangedEvent.next(this.messages.slice())
            })
    }
    
    getMessage(id: string): Message | null{
        let message = this.messages.find(msg => msg.id === id);
        if(message!=undefined){
            return message;
        } else{return null}
    }

    addMessage(message: Message){
        this.messages.push(message);
        // this.messageChangedEvent.emit(this.messages.slice());
        this.storeMessages();
    }

}