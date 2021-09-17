import { Test, TestingModule } from '@nestjs/testing';
import { Cloudinary } from '../../src/cloudinary/cloudinary';

describe('CloudinaryService', () => {
  let service: Cloudinary;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Cloudinary],
    }).compile();

    service = module.get<Cloudinary>(Cloudinary);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});