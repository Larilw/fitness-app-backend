import { Module } from '@nestjs/common';
import { PrismaService } from 'src/Services/prisma.service';
import { PesagemService } from '../Services/pesagem.service';
import { PesagemController } from '../Controllers/pesagem.controller';

@Module({
  controllers: [PesagemController],
  providers: [PrismaService, PesagemService],
})
export class PesagemModule {}
