import { Injectable, EventEmitter } from "@angular/core";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Document } from "./document.model";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    maxDocumentId!:number
    documentListChangedEvent = new Subject<Document[]>();
    // documentChangedEvent = new EventEmitter<Document[]>();
    documents: Document[]=[];
    documentSelectedEvent = new EventEmitter<Document>();

    constructor(){
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
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

    // deleteDocument(document: Document) {
    //     if (!document) {
    //        return;
    //     }
    //     const pos = this.documents.indexOf(document);
    //     if (pos < 0) {
    //        return;
    //     }
    //     this.documents.splice(pos, 1);
    //     this.documentChangedEvent.emit(this.documents.slice());
    //  }

     addDocument(newDocument: Document){
        if(newDocument===undefined || newDocument === null){
            return
        }
        this.maxDocumentId++;
        newDocument.id= this.maxDocumentId.toString();
        this.documents.push(newDocument);
        let documentsListClone= this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
     };

     updateDocument(originalDocument: Document, newDocument: Document){
        if(originalDocument===undefined||
            originalDocument===null||
            newDocument===undefined||
            newDocument===null){
            return
        };
        let pos= this.documents.indexOf(originalDocument);
        if(pos<0){
            return
        }
        newDocument.id=originalDocument.id;
        this.documents[pos] = newDocument;
        let documentsListClone = this.documents.slice()
        this.documentListChangedEvent.next(documentsListClone);
     };

    deleteDocument(document: Document){
        if(document === undefined || document === null){
            return
        }
        let pos= this.documents.indexOf(document);
        if (pos < 0){
            return
        }
        this.documents.splice(pos,1);
        let documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
    } 

    
    getMaxId(): number {
        let maxId = 0;
        for(let doc of this.documents){
            let currentId = +doc.id;
            if(currentId > maxId){
                maxId = currentId
            }
        }
        return maxId;
    }

}