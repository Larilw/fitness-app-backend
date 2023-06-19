import { Module } from '@nestjs/common';
import { PrismaService } from 'src/Services/prisma.service';
import { PesagemService } from '../Services/pesagem.service';
import { DesafioService } from 'src/Services/desafio.service';
import { PesagemController } from '../Controllers/pesagem.controller';

@Module({
  controllers: [PesagemController],
  providers: [PrismaService, PesagemService, DesafioService],
})
export class PesagemModule {}
