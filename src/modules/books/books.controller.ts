import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) { }
    
    
    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.booksService.create(createBookDto)
    }

    @Get()
    findAll(@Query() query) {
        return this.booksService.findAll(query)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.booksService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBookdto: UpdateBookDto) {
        return this.booksService.update(id,updateBookdto)   
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.booksService.remove(id)
    }

    @Get('available')
    findAvailableBooks() {
        return this.booksService.findAvailableBooks()
    }

    @Get('loaned')
    loanedBooks() {
        return this.booksService.loanedBooks()
    }
}
