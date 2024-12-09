import { Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get('list')
  bookList() {
    return this.bookService.bookList();
  }
  @Post('sign')
  signBook() {
    return this.bookService.signBook();
  }
  @Post('see')
  seeBook() {
    return this.bookService.seeBook();
  }
}
