import { Injectable, EventEmitter } from "@angular/core";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";
import { Document } from "./document.model";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    maxDocumentId!:number
    documentListChangedEvent = new Subject<Document[]>();
    // documentChangedEvent = new EventEmitter<Document[]>();
    documents: Document[]=[];
    documentSelectedEvent = new EventEmitter<Document>();

    constructor(private http: HttpClient){
        this.documents = MOCKDOCUMENTS;
        this.maxDocumentId = this.getMaxId();
    }


    getDocuments(){
        this.http.get<Document[]>('http://localhost:3000/documents')
        .subscribe(
            // success method
            (documents: Document[]) => {
               this.documents = documents
               this.maxDocumentId = this.getMaxId();
              // sort the list of documents
              this.documents.sort((a,b)=>a.name.localeCompare(b.name));
              // /emit the next document list change event
              this.documentListChangedEvent.next(this.documents.slice());
            }, error=> {
                console.log(error);
            }
            )
        return this.documents.slice();
    }

    storeDocuments(){
        let documentsString = JSON.stringify(this.documents);
        this.http.put<Document[]>(
            'https://cmsagag-default-rtdb.firebaseio.com/documents.json',
            documentsString, 
            {
                headers: new HttpHeaders({'Content-Type':'application/json'})
            }).subscribe(
                ()=>{
                    this.documentListChangedEvent.next(this.documents.slice())
                }
            )
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
        if(!newDocument){
            return
        }
        newDocument.id = "";
        const headers = new HttpHeaders({'Content-Type': 'application/json'});

        this.http.post<{ message: string, document: Document }>('https://cms-app-agag.onrender.com/documents/',
            newDocument,
            { headers: headers })
            .subscribe(
                (responseData) => {
                    // add new document to documents
                    this.documents.push(responseData.document);
                    this.documentListChangedEvent.next(this.documents.slice());
                  }
            )

        // this.maxDocumentId++;
        // newDocument.id= this.maxDocumentId.toString();
        // this.documents.push(newDocument);
        // let documentsListClone= this.documents.slice();
        // // this.documentListChangedEvent.next(documentsListClone);
        // this.storeDocuments();
     };

     updateDocument(originalDocument: Document, newDocument: Document){
        if (!originalDocument || !newDocument) {
            return;
          }
        let pos= this.documents.indexOf(originalDocument);
        if(pos<0){
            return
        }
        newDocument.id=originalDocument.id;
        // newDocument._id=originalDocument._id;
        const headers =  new HttpHeaders({'Content-Type': 'application/json'});
        this.http.put('https://cms-app-agag.onrender.com/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        () => {
          this.documents[pos] = newDocument;
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );

        // this.documents[pos] = newDocument;
        // let documentsListClone = this.documents.slice()
        // // this.documentListChangedEvent.next(documentsListClone);
        // this.storeDocuments();
     };

    deleteDocument(document: Document){
        if (!document) {
            return;
          }
        let pos= this.documents.indexOf(document);
        if (pos < 0){
            return
        }
        this.http.delete('https://cms-app-agag.onrender.com/documents/' + document.id)
        .subscribe(
          () => {
            this.documents.splice(pos, 1);
            this.documentListChangedEvent.next(this.documents.slice());
          }
        );
        // this.documents.splice(pos,1);
        // let documentsListClone = this.documents.slice();
        // // this.documentListChangedEvent.next(documentsListClone);
        // this.storeDocuments();
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