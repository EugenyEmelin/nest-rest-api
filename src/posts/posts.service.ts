import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '../users/posts.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postModel: typeof Post,
    private fileService: FilesService,
  ) {}

  async create(createPostDto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    return await this.postModel.create({
      ...createPostDto,
      image: fileName,
    });
  }
}
