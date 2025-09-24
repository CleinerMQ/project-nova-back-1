import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import cuid from 'cuid';

@Injectable()
export class ParseCuidPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!cuid.isCuid(value)) {
      throw new BadRequestException(`El id: ${value} no es un CUID válido`);
    }
    return value; // si es válido lo deja pasar
  }
}
