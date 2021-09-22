import { Test } from '@nestjs/testing';
import { Cloudinary } from '../../src/cloudinary/cloudinary';
import { ConfigService } from '../../src/config/configuration';
import {
  ResponseCallback,
  UploadApiOptions,
  UploadApiResponse,
  UploadResponseCallback,
  UploadStream,
  v2,
} from 'cloudinary';

jest.mock('cloudinary');

describe('Cloudinary', () => {
  let helper: Cloudinary;
  const fileId = 'ixnhlev1gtysbsyrslcr';

  const fileDto = {
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
  };

  const customModule = async () => {
    return Test.createTestingModule({
      providers: [
        Cloudinary,
        {
          provide: 'CONFIG',
          useClass: ConfigService,
        },
      ],
    }).compile();
  };

  it('should be defined', async () => {
    const module = await customModule();

    helper = module.get<Cloudinary>(Cloudinary);
    expect(helper).toBeDefined();
  });

  it('should correct delete a file', async () => {
    const module = await customModule();

    jest
      .spyOn(v2.uploader, 'destroy')
      .mockImplementation((public_id: string, callback?: ResponseCallback) => {
        callback(null, public_id);
        return Promise.resolve(true);
      });

    helper = module.get<Cloudinary>(Cloudinary);
    expect(await helper.delete(fileId)).toBe(fileId);
  });

  it('should fail to delete a file', async () => {
    const module = await customModule();

    jest
      .spyOn(v2.uploader, 'destroy')
      .mockImplementation((public_id: string, callback?: ResponseCallback) => {
        callback(new Error('erro ao salvar'), public_id);
        return Promise.resolve(false);
      });

    helper = module.get<Cloudinary>(Cloudinary);
    try {
      await helper.delete(fileId);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should correct upload a file', async () => {
    const module = await customModule();

    const response: UploadApiResponse = {
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
      access_mode: 'string',
      pages: 1,
      access_control: [],
      moderation: [],
      context: {},
      metadata: {},
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

    jest
      .spyOn(v2.uploader, 'upload_stream')
      .mockImplementation(
        (options?: UploadApiOptions, callback?: UploadResponseCallback) => {
          callback(null, response);
          return new UploadStream();
        },
      );
    helper = module.get<Cloudinary>(Cloudinary);
    expect(await helper.upload(fileDto)).toStrictEqual(response);
  });

  it('should failt to upload a file', async () => {
    const module = await customModule();

    jest
      .spyOn(v2.uploader, 'upload_stream')
      .mockImplementation(
        (options?: UploadApiOptions, callback?: UploadResponseCallback) => {
          callback(
            {
              message: 'erro',
              name: 'erro',
              http_code: 1,
            },
            null,
          );
          return new UploadStream();
        },
      );

    helper = module.get<Cloudinary>(Cloudinary);

    try {
      await helper.upload(fileDto);
    } catch (error) {
      expect(error.name).toBe('erro');
    }
  });
});
