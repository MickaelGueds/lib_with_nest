import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateBookDto } from './dto/create-book.dto';

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




}
