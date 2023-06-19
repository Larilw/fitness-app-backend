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
import { DesafioCompleto } from '../Services/desafio.service';

@Controller()
export class DesafioController {
  constructor(private readonly desafioService: DesafioService) {}

  @Get('desafio/:id')
  async getDesafioById(@Param('id') id: string): Promise<DesafioCompleto> {
    return this.desafioService
      .desafioCompleto({ id: Number(id) })
      .then((desafio) => {
        return desafio;
      });
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

    return this.desafioService.createDesafio({
      dataInicio: new Date(dataInicio).getTime(),
      dataFinal: new Date(dataFinal).getTime(),
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

  @Get('/desafios/usuario/:id')
  async getDesafiosByUserId(@Param('id') id: string): Promise<DesafioModel[]> {
    return this.desafioService.desafiosByUserId(Number(id));
  }

  @Get('desafios/data/:data')
  async getDesafiosByDate(
    @Param('data') data: string,
  ): Promise<DesafioModel[]> {
    return this.desafioService.desafiosByDate(new Date(data).getTime());
  }
}
