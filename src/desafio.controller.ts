import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { DesafioService } from './desafio.service';
import { Desafio as DesafioModel } from '@prisma/client';

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
      dataInicio: Date;
      dataFinal: Date;
      titulo: string;
      descricao: string;
      meta: number;
      idUsuario: number;
    },
  ): Promise<DesafioModel> {
    const { dataInicio, dataFinal, titulo, descricao, meta, idUsuario } =
      desafioData;
    return this.desafioService.createDesafio({
      dataInicio,
      dataFinal,
      titulo,
      descricao,
      meta,
      usuario: {
        connect: { id: idUsuario },
      },
    });
  }
}
