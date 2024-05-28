import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { generateAesKey, aesEncrypt, aesDecrypt } from './aes.util';
import * as path from 'path';

@Injectable()
export class AppService {
  private publicKey: string;
  private privateKey: string;

  constructor() {
    this.publicKey = fs.readFileSync(
      path.join('./rsa-nest/', '..', 'public.pem'),
      'utf8',
    );
    this.privateKey = fs.readFileSync(
      path.join('./rsa-nest/', '..', 'private.pem'),
      'utf8',
    );
  }

  encrypt(payload: string): { data1: string; data2: string } {
    try {
      const aesKey = generateAesKey();
      const data2 = aesEncrypt(payload, aesKey);
      const encryptedKey = crypto.publicEncrypt(
        {
          key: this.publicKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: 'sha256',
        },
        Buffer.from(aesKey, 'hex'),
      );
      const data1 = encryptedKey.toString('base64');
      return { data1, data2 };
    } catch (error) {
      console.error('Encryption error:', error);
      throw error;
    }
  }

  decrypt(data1: string, data2: string): string {
    try {
      const decryptedKey = crypto.privateDecrypt(
        {
          key: this.privateKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: 'sha256',
        },
        Buffer.from(data1, 'base64'),
      );
      const aesKey = decryptedKey.toString('hex');
      return aesDecrypt(data2, aesKey);
    } catch (error) {
      console.error('Decryption error:', error);
      throw error;
    }
  }
}
