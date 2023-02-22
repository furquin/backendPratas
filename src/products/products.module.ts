import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../database/prismaService';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService]
})
export class ProductsModule {}
