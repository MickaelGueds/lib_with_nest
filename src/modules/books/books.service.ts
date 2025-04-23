import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBookDto } from "./dto/create-book.dto";

@Injectable()
export class BooksService {
    constructor(private prisma: PrismaService) { }

    async create(createBookDto: CreateBookDto) {
        return this.prisma.book.create({
            data: createBookDto,
            include: {
                author: true,
            },
        });
    }
}
