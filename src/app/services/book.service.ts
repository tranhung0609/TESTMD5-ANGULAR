import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../models/book";
import {environment} from "../../environments/environment";

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) {
  }

  getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(API_URL);
  }

  getBookById(id: number): Observable<Book>{
    return this.httpClient.get<Book>(API_URL + '/' + id);
  }

  createBook(book: Book): Observable<any> {
    return this.httpClient.post<any>(API_URL, book);
  }

  updateBook(id: number, book: Book): Observable<any> {
    return this.httpClient.put(`${API_URL}/${id}`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.httpClient.delete<any>(API_URL + '/' + id);
  }


}
