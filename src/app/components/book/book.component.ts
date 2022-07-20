import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../models/book";
import {BookService} from "../../services/book.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  formBook!: FormGroup;
  books: Book[] = [];
  book?: Book;

  constructor(private bookService: BookService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formBook = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    this.getAllBooks();
  }

  get id() {
    return this.formBook?.get('id')
  }

  get title() {
    return this.formBook?.get('title')
  }

  get author() {
    return this.formBook?.get('author')
  }

  get description() {
    return this.formBook?.get('description')
  }

  getAllBooks() {
    this.bookService.getAllBooks().subscribe(data => {this.books = data});

    this.formBook?.reset();
    // // @ts-ignore
    // document.getElementById('#form-create').hidden = true;
    // // @ts-ignore
    // document.getElementById('#form-update').hidden =true;
  }

  getBook(id: number) {
    this.bookService.getBookById(id).subscribe((data) => {
      this.books = [];
      this.books.push(data);
    });
  }

  createBook() {
    const book = {
      id: this.formBook?.value.id,
      title: this.formBook?.value.title,
      author: this.formBook?.value.author,
      description: this.formBook?.value.description
    };
    this.bookService.createBook(book).subscribe(() => {
      alert('Create Book Successfully');
      this.formBook?.reset();
      this.getAllBooks();
    });
  }

  editBook(id: any) {
    this.bookService.getBookById(id).subscribe(data => this.formBook?.patchValue(data));
    // @ts-ignore
    document.getElementById("form-update").hidden = false;
    // @ts-ignore
    document.getElementById("form-create").hidden = true;
  }

  updateBook() {
    const book = {
      id: this.formBook?.value.id,
      title: this.formBook?.value.title,
      author: this.formBook?.value.author,
      description: this.formBook?.value.description
    };
    this.bookService.updateBook(book.id, book).subscribe(() => {
      alert('Update Book Successfully');
      this.formBook?.reset();
      this.getAllBooks();
      // @ts-ignore
      document.getElementById("form-update").hidden = true;
    });
  }

  deleteBook(id: any, title: any) {
    if (confirm('Are you sure you want to delete book: ' + title + ' ?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        alert('Delete Successfully');
        this.getAllBooks();
      });
    }
  }
}
