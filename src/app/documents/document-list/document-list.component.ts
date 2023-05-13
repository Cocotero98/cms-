import { Component, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    {id: 1, name:'OOP', description: 'this is de description of OOP', url: 'docs/oop.pdf', children:[{test:'test'}]},
    {id: 1, name:'test', description: 'this is a test', url: 'test/url', children:[{test:'test'}]},
    {id: 1, name:'WSD', description: 'this is a test decription for WSD', url: 'docs/wsd.pdf', children:[{test:'test'}]},
    {id: 1, name:'EP', description: 'I am testing this description', url: 'docs/EP.pdf', children:[{test:'test'}]}
  ] 

  onSelectedDocument(document: Document){
    this.selectedDocumentEvent.emit(document);
  }
}
