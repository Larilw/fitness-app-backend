import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { DesafioService } from '../Services/desafio.service';
import { Desafio as DesafioModel } from '@prisma/client';
import { parseISO } from 'date-fns';

@Controller()
export class DesafioController {
  constructor(private readonly desafioService: DesafioService) {}

  @Get('desafio/:id')
  async getDesafioById(@Param('id') id: string): Promise<DesafioModel> {
    return this.desafioService.desafio({ id: Number(id) });
  }

  @Get('desafios')
  async getDesafios(): Promise<DesafioModel[]> {
    return this.desafioService.desafios({});
  }

  @Post('criarDesafio')
  async createDesafio(
    @Body()
    desafioData: {
      dataInicio: string;
      dataFinal: string;
      titulo: string;
      descricao: string;
      meta: number;
      idUsuario: number;
    },
  ): Promise<DesafioModel> {
    const { dataInicio, dataFinal, titulo, descricao, meta, idUsuario } =
      desafioData;

    // Converter a string para DateTime
    const dataInicioParsed = parseISO(dataInicio);

    // Converter a string para DateTime
    const dataFinalParsed = parseISO(dataFinal);

    return this.desafioService.createDesafio({
      dataInicio: dataInicioParsed,
      dataFinal: dataFinalParsed,
      titulo,
      descricao,
      meta,
      usuario: {
        connect: { id: idUsuario },
      },
    });
  }

  @Delete('deletarDesafio/:id')
  async deleteChallenge(@Param('id') id: string): Promise<DesafioModel> {
    return this.desafioService.deleteDesafio({ id: Number(id) });
  }
}
