import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MidiaService } from './midia.service';
import { Cloudinary } from '../cloudinary/cloudinary';
import { ReceiveFileDto } from './dto/receiveFile.dto';

@Controller()
export class MidiaController {
  constructor(
    private readonly midiaService: MidiaService,
    private readonly ICloudinary: Cloudinary,
  ) {}

  @MessagePattern('uploadMidia')
  async uploadFile(receivedFile: any) {
    const decodedFile = new ReceiveFileDto(receivedFile);

    const response = await this.ICloudinary.upload(decodedFile.file);

    return response;
  }

  @MessagePattern('removeMidia')
  remove(@Payload() id: number) {
    return this.midiaService.remove(id);
  }
}
