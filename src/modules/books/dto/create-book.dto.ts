import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

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

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: ' Id do autor do livro',
    required: false,
  })
  authorId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: ' Nome do autor do livro',
    required: false,
  })
  authorName?: string;
}
