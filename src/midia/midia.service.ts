import { HttpStatus, Injectable } from '@nestjs/common';
import { Cloudinary } from '../cloudinary/cloudinary';
import { MicrosserviceException } from '../commons/exceptions/MicrosserviceException';

@Injectable()
export class MidiaService {
  constructor(private cloudinary: Cloudinary) {}

  async create(fileTransferable: Express.Multer.File) {
    try {
      return await this.cloudinary.upload(fileTransferable);
    } catch (error) {
      throw new MicrosserviceException(
        `Erro ao realizar upload do arquivo:: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getFileUrl(fileId: string) {
    return this.cloudinary.getFileUrl(fileId);
  }

  async remove(id: string) {
    return this.cloudinary.delete(id);
  }
}
