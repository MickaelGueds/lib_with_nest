import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateBookDto } from './dto/create-book.dto';
import { skip } from 'node:test';
import { contains } from 'class-validator';
import { UpdateBookDto } from './dto/update-book.dto';
import { existsSync } from 'fs';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  // Create book method
  async create(createBookDto: CreateBookDto) {
    let authorId = createBookDto.authorId;
      if (!authorId && createBookDto.authorName) {
        const author = await this.prisma.author.findFirst({
          where: {
            name: createBookDto.authorName,
          },//if id not show, so search for name, and if not name return exception 
        });
        if (!author) {
          throw new NotFoundException('Autor não encontrado');
        }
        authorId = author.id;
      }
      if (!authorId && !createBookDto.authorId) {
        throw new BadRequestException('Autor não encontrado');
    }
    const { authorName, ...bookData } = createBookDto;
    return this.prisma.book.create({
      data: {
        ...bookData,
        authorId,
      },
      include: {
        author: true,
      },
    });
  }

  async findAll(params: { skip?: number; take?: number;  title?: string; authorName?: string }) {
    const{skip = 0, take = 10, title, authorName} = params
    return this.prisma.book.findMany({
      skip,
      take,
      where: {
        ...(title && {
          title: { contains: title,mode: 'insensitive' }
        }),
        ...(authorName && {
          authorName: {contains: authorName,mode: 'insensitive'}
        })

      },
      include: { author: true },
      orderBY: {createdAt: 'desc'}
    })
  }

  async findOne(id: string ) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {author: true}
    })
    if (!book) {
      throw new NotFoundException('Livro nao encontrado')
    }
    return book
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const existingBook = await this.prisma.book.findUnique({
      if (!existingBook) {
        throw new NotFoundException('Livro nao encontrado') 
      } 
    })
    let authorId = updateBookDto.authorId
    
    if (!authorId && updateBookDto.authorId) {
      const author = await this.prisma.book.findFirst({
        where: {name: updateBookDto.authorName}
      })
      if (!author) {
        throw new NotFoundException('Autor não encotrado!')

      }
      authorId = author.id 
    }
    
    
  }



  async remove()





}
