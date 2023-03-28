import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prismaService';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {

   constructor (private prisma: PrismaService) {}
  
  async create(data: CreateProductDto): Promise<CreateProductDto> {
    const product = await this.prisma.product.findFirst({
      where: {
        bar_code: data.bar_code,
      }
    })

    if(!product) {
      return await this.prisma.product.create({
        data,
      }) 
    }

    throw new HttpException('Product already exists', HttpStatus.BAD_REQUEST)
    }

  async findAll(): Promise<CreateProductDto[]> {
    return await this.prisma.product.findMany();
  }

  async findOne(data: object) {
    const product = await this.prisma.product.findMany({
      where: {
        ...data,
      }
    })

    if (!product) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

    return product
    
  }

  async remove(bar_code: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        bar_code: bar_code,
      }
    })

    if (!product) throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

    await this.prisma.product.delete({
      where: {
        bar_code: bar_code,
      }
    })
    return `Product ${bar_code} deleted`;
  }
}
