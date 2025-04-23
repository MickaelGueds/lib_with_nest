import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BooksModule } from "./modules/books/books.module";
import { AuthorsModule } from "./modules/authors/authors.module";
import { UsersModule } from "./modules/users/users.module";
import { LoansModule } from "./modules/loans/loans.module";

@Module({
  imports: [BooksModule, AuthorsModule, UsersModule, LoansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
