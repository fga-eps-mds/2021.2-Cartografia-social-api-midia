import { HttpStatus, Injectable } from '@nestjs/common';
import { Cloudinary } from '../cloudinary/cloudinary';
import { MicrosserviceException } from '../commons/exceptions/MicrosserviceException';

@Injectable()
export class MidiaService {
  constructor(private cloudinary: Cloudinary) {}

  async create(fileTransferable) {
    console.log(fileTransferable);
    try {
      const response = await this.cloudinary.upload(fileTransferable);
      return response;
    } catch (error) {
      console.log(error);
      throw new MicrosserviceException(
        `Erro ao realizar upload do arquivo:: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getFileUrl(fileId: string) {
    return this.cloudinary.getFileUrl(fileId);
  }

  async remove(id: number) {
    return `This action removes a #${id} midia`;
  }
}
