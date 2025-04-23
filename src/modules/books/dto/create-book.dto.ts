import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: ' Titulo do livro',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ISBN do livro',
  })
  isbn: string;

  @IsInt()
  @Min(1900)
  @ApiProperty({
    description: ' Ano de publicação do livro',
  })
  publishYear: number;

  @IsInt()
  @Min(0)
  @ApiProperty({
    description: ' Quantidade de exemplares do livro',
  })
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: ' Autor do livro',
  })
  authorId: string;
}
