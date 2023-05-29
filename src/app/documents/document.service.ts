import { Injectable, EventEmitter } from "@angular/core";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Document } from "./document.model";

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    documentChangedEvent = new EventEmitter<Document[]>()
    documents: Document[]=[];
    documentSelectedEvent = new EventEmitter<Document>();

    constructor(){
        this.documents = MOCKDOCUMENTS;
    }


    getDocuments(){
        return this.documents.slice();
    }

    getDocument(id: string): Document{
        let document = this.documents.find(doc => doc.id === id);
        if(document!=undefined){
            return document;
        }else{
            return this.documents[0];
        }
    }

    deleteDocument(document: Document) {
        if (!document) {
           return;
        }
        const pos = this.documents.indexOf(document);
        if (pos < 0) {
           return;
        }
        this.documents.splice(pos, 1);
        this.documentChangedEvent.emit(this.documents.slice());
     }

}