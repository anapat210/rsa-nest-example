import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { EncryptDto } from './dto/encrypt.dto';
import { DecryptDto } from './dto/decrypt.dto';

@ApiTags('RSA Encryption')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('get-encrypt-data')
  @ApiOperation({ summary: 'Encrypt payload' })
  @ApiResponse({ status: 201, description: 'Payload encrypted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async getEncryptData(@Body() encryptDto: EncryptDto) {
    try {
      const { payload } = encryptDto;
      const { data1, data2 } = await this.appService.encrypt(payload);
      return {
        successful: true,
        error_code: '',
        data: { data1, data2 },
      };
    } catch (error) {
      console.error('Encryption error:', error);
      return {
        successful: false,
        error_code: 'ENCRYPTION_ERROR',
        data: null,
      };
    }
  }

  @Post('get-decrypt-data')
  @ApiOperation({ summary: 'Decrypt data' })
  @ApiResponse({ status: 201, description: 'Data decrypted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async getDecryptData(@Body() decryptDto: DecryptDto) {
    try {
      const { data1, data2 } = decryptDto;
      const payload = await this.appService.decrypt(data1, data2);
      return {
        successful: true,
        error_code: '',
        data: { payload },
      };
    } catch (error) {
      console.error('Decryption error:', error);
      return {
        successful: false,
        error_code: 'DECRYPTION_ERROR',
        data: null,
      };
    }
  }
}
