import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private uploadService: UploadService,
  ) {}

  async getAllUsers() {
    const users = await this.usersRepository.find();
    return users;
  }

  async getOneUser(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    console.log(user);
    
    if (!user) throw new NotFoundException('no user found for this id');
    return user;
  }

  async createUser(body: CreateUserDto) {
    if(body.password)
      body.password = await bcrypt.hash(body.password, 10);
    try {
      const user = this.usersRepository.create(body);
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // Postgres duplicate key error
        throw new BadRequestException('Email already exists');
      }
      throw error;
    }
  }

  async updateUser(id: number, body: Partial<User>) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('No user found for this id');
    const updatedUser = { ...user, ...body };
    return await this.usersRepository.save(updatedUser);
  } 
  
  async removeUser(id: number) {
    await this.usersRepository.delete({ id });
  }

  async getMe(userId: number) {
    const user= await this.usersRepository.findOneBy({id: userId});
    if(!user) throw new NotFoundException('No user found for this id');
    const downloadSignedUrl= user?.profileImageKey? await this.uploadService.getDownloadSignedUrl(user.profileImageKey, 3600): null;
    return {...user, downloadSignedUrl};
  }

  async updateMe(userId: number, body: Partial<User>) {
    const user= await this.usersRepository.findOneBy({id:userId});
    if(!user)
      throw new NotFoundException("No user foun for this id");
    const updateUser= {...user, ...body};
    return await this.usersRepository.save(updateUser);
  }

  async findByEmail(email:string){
    const user = await this.usersRepository.findOneBy({email:email});
    return user;
  }
}
