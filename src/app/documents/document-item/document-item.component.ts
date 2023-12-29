import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { OnInit } from '@angular/core';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit{
  @Input() document!: Document;
  newRoute!: string | any[] | null | undefined;

  
  ngOnInit(): void {
    this.newRoute = '/documents/'+this.document.id;
  }

}
