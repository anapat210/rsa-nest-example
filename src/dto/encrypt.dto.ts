import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EncryptDto {
  @ApiProperty({ description: 'Payload to be encrypted', maxLength: 2000 })
  @IsNotEmpty()
  @IsString()
  @Length(0, 2000)
  payload: string;
}
