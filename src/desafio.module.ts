import { Module } from '@nestjs/common';
import { DesafioService } from './desafio.service';
import { DesafioController } from './desafio.controller';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [DesafioController],
  providers: [PrismaService, DesafioService],
})
export class DesafioModule {}
