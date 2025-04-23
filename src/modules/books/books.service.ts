import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBookDto } from "./dto/create-book.dto";

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    let authorId: CreateBookDto.authorId;

    if (!authorId && createBookDto.authorName) {
      const author = await this.prisma.author.findFirst({
        where: {
          name: createBookDto.authorName,
        },
      });
      if (!author) {
        throw new NotFoundException("Autor não encontrado");
      }
      authorId = author.id;
    }

    if (!authorId && !createBookDto.authorId) {
      throw new BadRequestException("Autor não encontrado");
    }
    const { authorName, ...bookData } = createBookDto;

    return this.prisma.book.create({
      data: {
        ...bookData,
        authorId,
      },
      include: {
        author: true, // Inclui os dados do autor na resposta
      },
    });
  }
}
