import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit{
  originalDocument!: Document;
  document: Document = new Document('','','','',[{}]);
  editMode = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ){

  }
  
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        let id = params['id']; 
        if (!id){
          this.editMode= false;
          return
        } 
        this.originalDocument = this.documentService.getDocument(id);
        if (!this.originalDocument){
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    )
  }

  onSubmit(f: NgForm){
    let value = f.value;
    let newDocument = new Document(value.id,value.name,value.description,value.url,value.children);
    console.log(this.editMode)
    if (this.editMode){
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else{
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }

  onCancel(){
    this.router.navigate(['/documents']);
  }
}
