import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prismaService';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}
   
  async create(data: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      }
    })

    if (!user) { 
      return  await this.prisma.user.create({
        data,
      })
    }

    throw new HttpException('User already exists', HttpStatus.BAD_REQUEST )
    
  }

  async findAll() {
    return await this.prisma.user.findMany()
  }

  async findOne(email: string): Promise<CreateUserDto> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      }
    })

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

    return await this.prisma.user.findFirst({
      where: {
        email
      }
    }) 
  }

  async remove(email: string): Promise<string> {
    
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      }
    })

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    
    await this.prisma.user.delete({
      where: {
        email
      }
    })

    return 'User deleted'
  }
}
