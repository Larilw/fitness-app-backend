import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PesagemService } from '../Services/pesagem.service';
import { Pesagem as PesagemModel } from '@prisma/client';
import { parseISO } from 'date-fns';

@Controller()
export class PesagemController {
  constructor(private readonly pesagemService: PesagemService) {}

  @Get('pesagem/:id')
  async getPesagemById(@Param('id') id: string): Promise<PesagemModel> {
    return this.pesagemService.pesagem({ id: Number(id) });
  }

  @Get('pesagens')
  async getPesagens(): Promise<PesagemModel[]> {
    return this.pesagemService.pesagens({});
  }

  @Post('criarPesagem')
  async createPesagem(
    @Body()
    pesagemData: {
      dataPesagem: string;
      peso: number;
      idDesafio: number;
    },
  ): Promise<PesagemModel> {
    const { dataPesagem, peso, idDesafio } = pesagemData;

    // Converter a string para DateTime
    const dataPesagemParsed = parseISO(dataPesagem);

    return this.pesagemService.createPesagem({
      dataPesagem: dataPesagemParsed,
      peso,
      desafio: {
        connect: { id: idDesafio },
      },
    });
  }

  @Delete('deletarPesagem/:id')
  async deleteWeight(@Param('id') id: string): Promise<PesagemModel> {
    return this.pesagemService.deletePesagem({ id: Number(id) });
  }
}
