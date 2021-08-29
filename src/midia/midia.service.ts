import { Injectable } from '@nestjs/common';
import { CreateMidiaDto } from './dto/create-midia.dto';
import { UpdateMidiaDto } from './dto/update-midia.dto';

@Injectable()
export class MidiaService {
  create(createMidiaDto: CreateMidiaDto) {
    return 'This action adds a new midia';
  }

  findAll() {
    return `This action returns all midia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} midia`;
  }

  update(id: number, updateMidiaDto: UpdateMidiaDto) {
    return `This action updates a #${id} midia`;
  }

  remove(id: number) {
    return `This action removes a #${id} midia`;
  }
}
