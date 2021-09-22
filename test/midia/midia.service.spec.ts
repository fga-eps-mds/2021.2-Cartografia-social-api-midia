import { Test } from '@nestjs/testing';
import { MicrosserviceException } from '../../src/commons/exceptions/MicrosserviceException';
import { Cloudinary } from '../../src/cloudinary/cloudinary';
import { MidiaService } from '../../src/midia/midia.service';

describe('MidiaService', () => {
  let service: MidiaService;

  const customModule = async (fn: any) => {
    return Test.createTestingModule({
      providers: [
        MidiaService,
        {
          provide: Cloudinary,
          useValue: fn,
        },
      ],
    }).compile();
  };

  it('should be defined', async () => {
    const module = await customModule({ upload: jest.fn() });

    service = module.get<MidiaService>(MidiaService);

    expect(service).toBeDefined();
  });

  it('should upload file with success', async () => {
    const response = {
      asset_id: '33610a855094174e098674cd9d114f75',
      public_id: 'ixnhlev1gtysbsyrslcr',
      version: 1632082302,
      version_id: 'd434e9e8d466101e106e6712f9c8fd0c',
      signature: '4992a942ac5989de65b707fd34decc6f3497ac98',
      width: 228,
      height: 221,
      format: 'png',
      resource_type: 'image',
      created_at: '2021-09-19T20:11:42Z',
      tags: [],
      bytes: 5978,
      type: 'upload',
      etag: '3f785a6c7247468eaa44e431f3cf70c0',
      placeholder: false,
      url: 'http://res.cloudinary.com/nova-cartografia-social/image/upload/v1632082302/ixnhlev1gtysbsyrslcr.png',
      secure_url:
        'https://res.cloudinary.com/nova-cartografia-social/image/upload/v1632082302/ixnhlev1gtysbsyrslcr.png',
      original_filename: 'file',
      api_key: '156751358469945',
    };

    const module = await customModule({
      upload: () => response,
    });

    service = module.get<MidiaService>(MidiaService);

    expect(
      await service.create({
        fieldname: 'images',
        originalname: 'images',
        encoding: 'UTF-8',
        mimetype: 'asdfg',
        size: 5978,
        stream: null,
        destination:
          'http://res.cloudinary.com/nova-cartografia-social/image/upload/v1632082302/ixnhlev1gtysbsyrslcr.png',
        filename: 'images',
        path: '.',
        buffer: Buffer.from('U3RyaW5nIGRlIHRlc3Rl', 'base64'),
      }),
    ).toStrictEqual(response);
  });

  it('should fail to upload file', async () => {
    const module = await customModule({
      upload: () => Promise.reject(new Error()),
    });

    service = module.get<MidiaService>(MidiaService);

    try {
      await service.create({
        fieldname: 'images',
        originalname: 'images',
        encoding: 'UTF-8',
        mimetype: 'asdfg',
        size: 5978,
        stream: null,
        destination:
          'http://res.cloudinary.com/nova-cartografia-social/image/upload/v1632082302/ixnhlev1gtysbsyrslcr.png',
        filename: 'images',
        path: '.',
        buffer: Buffer.from('U3RyaW5nIGRlIHRlc3Rl', 'base64'),
      });
    } catch (error) {
      expect(error).toBeInstanceOf(MicrosserviceException);
    }
  });

  it('should get file url midiaService', async () => {
    const url =
      'http://res.cloudinary.com/nova-cartografia-social/image/upload/v1632082302/ixnhlev1gtysbsyrslcr.png';

    const fileId = 'ixnhlev1gtysbsyrslcr';

    const module = await customModule({
      getFileUrl: () => url,
    });

    service = module.get<MidiaService>(MidiaService);

    expect(await service.getFileUrl(fileId)).toStrictEqual(url);
  });

  it('should delete file url midiaService', async () => {
    const fileId = 'ixnhlev1gtysbsyrslcr';

    const module = await customModule({
      delete: () =>
        Promise.resolve({
          result: 'ok',
        }),
    });

    service = module.get<MidiaService>(MidiaService);

    expect(await service.remove(fileId)).toStrictEqual({ result: 'ok' });
  });
});
