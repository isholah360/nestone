import { Injectable } from '@nestjs/common';

@Injectable()
export class BookService {
  bookList() {
    return { Chesmistry: 'Ababio', Physics: 'Anyakoha' };
  }
  signBook() {
    return { signed: 'Chemistry' };
  }
  seeBook() {
    return { signed: 'Phsyisc' };
  }
}
