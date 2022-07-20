import {Component, OnInit} from '@angular/core';
import {BookService} from "../../services/book.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Book} from "../../models/book";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  book?: Book
  id: any

  constructor(private bookService: BookService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = parseInt(<string>paramMap.get('id'));
      this.getBookById(this.id);
    })
  }

  ngOnInit(): void {
  }

  getBookById(id: number) {
    this.bookService.getBookById(id).subscribe(book => {
      this.book = book;
    })
  }
}
