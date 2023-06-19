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
import { DesafioService } from 'src/Services/desafio.service';
import { Pesagem as PesagemModel } from '@prisma/client';

@Controller()
export class PesagemController {
  constructor(
    private readonly pesagemService: PesagemService,
    private readonly desafioService: DesafioService,
  ) {}

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
    },
  ): Promise<PesagemModel[]> {
    const { dataPesagem, peso } = pesagemData;
    return this.desafioService
      .desafiosByDate(new Date(dataPesagem).getTime())
      .then((desafiosValidos) => {
        let idsDesafiosValidos = desafiosValidos.map((desafio) => desafio.id);
        let promises = [];

        idsDesafiosValidos.forEach((id) => {
          promises.push(
            this.pesagemService
              .createPesagem({
                dataPesagem: new Date(dataPesagem).getTime(),
                peso,
                desafio: {
                  connect: { id: id },
                },
              })
              .then((pesagem) => pesagem)
              .catch((error) => error),
          );
        });
        return Promise.all(promises)
          .then((pesagens) => {
            console.log('Funcionou');
            return pesagens;
          })
          .catch((error) => error);
      });
  }

  @Delete('deletarPesagem/:id')
  async deleteWeight(@Param('id') id: string): Promise<PesagemModel> {
    return this.pesagemService.deletePesagem({ id: Number(id) });
  }

  @Get('pesagens/usuario/:id')
  async getPesagensByUserId(@Param('id') id: string): Promise<PesagemModel[]> {
    return this.pesagemService.pesagensByUserId(Number(id));
  }
}
