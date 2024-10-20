import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async saveImage(filename: string, path: string): Promise<Image> {
    const image = this.imageRepository.create({ filename, path });
    return this.imageRepository.save(image);
  }
}
