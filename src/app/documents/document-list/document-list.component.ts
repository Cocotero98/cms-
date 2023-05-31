import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy{
  documents: Document[] = [] ;
  subscription!: Subscription;

  constructor(private documentService: DocumentService){};

  ngOnInit(){
    this.documentService.getMaxId();
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent.subscribe((docs)=>{this.documents = docs});
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentList: Document[])=>{
        this.documents = documentList;
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
