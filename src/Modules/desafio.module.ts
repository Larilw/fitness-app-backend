import { Module } from '@nestjs/common';
import { DesafioService } from '../Services/desafio.service';
import { DesafioController } from '../Controllers/desafio.controller';
import { PrismaService } from '../Services/prisma.service';

@Module({
  controllers: [DesafioController],
  providers: [PrismaService, DesafioService],
})
export class DesafioModule {}
