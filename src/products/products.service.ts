import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prismaService';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {

   constructor (private prisma: PrismaService) {}
  
  async create(data: CreateProductDto) {
    
    return await this.prisma.product.create({
      data,
    }) 
    }

  findAll() {
    return `This action returns all produtos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
