import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { ImageService } from './image.service';
import { Request } from 'express';

@Controller('upload')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = randomUUID() + '-' + file.originalname;
          cb(null, uniqueSuffix);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request, // Inject the request object
  ) {
    // Save image details in your database
    const savedImage = await this.imageService.saveImage(
      file.filename,
      file.path,
    );

    // Construct the base URL dynamically from the request
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // Full URL to the uploaded image
    const imageUrl = `${baseUrl}/uploads/${file.filename}`;

    // Return the image details including the full URL
    return { id: savedImage.id, filename: imageUrl };
  }
}
