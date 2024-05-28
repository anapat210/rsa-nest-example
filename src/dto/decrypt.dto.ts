import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DecryptDto {
  @ApiProperty({ description: 'Encrypted key (data1)' })
  @IsNotEmpty()
  @IsString()
  data1: string;

  @ApiProperty({ description: 'Encrypted payload (data2)' })
  @IsNotEmpty()
  @IsString()
  data2: string;
}
