import { Test, TestingModule } from '@nestjs/testing';
import { Cloudinary } from '../../src/cloudinary/cloudinary';
import { MidiaService } from '../../src/midia/midia.service';

describe('MidiaService', () => {
  let service: MidiaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MidiaService,
        {
          provide: Cloudinary,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    service = module.get<MidiaService>(MidiaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
