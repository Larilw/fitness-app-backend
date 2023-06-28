import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Desafio, Prisma, Usuario, Pesagem } from '@prisma/client';
import { PesagemService } from './pesagem.service';

export interface DesafioCompleto {
  id: number;
  dataInicio: BigInt;
  dataFinal: BigInt;
  titulo: string;
  descricao: string;
  usuario: Usuario;
  pesagens: Pesagem[];
}

@Injectable()
export class DesafioService {
  constructor(
    private prisma: PrismaService,
    private pesagemService: PesagemService,
  ) {}

  async desafio(
    desafioWhereUniqueInput: Prisma.DesafioWhereUniqueInput,
  ): Promise<Desafio | null> {
    return this.prisma.desafio.findUnique({
      where: desafioWhereUniqueInput,
    });
  }

  async desafios(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DesafioWhereUniqueInput;
    where?: Prisma.DesafioWhereInput;
    orderBy?: Prisma.DesafioOrderByWithRelationInput;
  }): Promise<Desafio[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.desafio.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createDesafio(data: Prisma.DesafioCreateInput): Promise<Desafio> {
    data.dataFinal = new Date(Number(data.dataFinal)).getTime();
    data.dataInicio = new Date(Number(data.dataInicio)).getTime();
    return this.prisma.desafio.create({
      data,
    });
  }

  async updateDesafio(params: {
    where: Prisma.DesafioWhereUniqueInput;
    data: Prisma.DesafioUpdateInput;
  }): Promise<Desafio> {
    const { data, where } = params;
    return this.prisma.desafio.update({
      data,
      where,
    });
  }

  async deleteDesafio(challengeId: number): Promise<Desafio> {
    await this.pesagemService.deletePesagens(challengeId);
    return this.prisma.desafio.delete({
      where: {
        id: challengeId,
      },
    });
  }

  async desafiosByUserId(userId: number): Promise<Desafio[]> {
    return this.prisma.desafio.findMany({
      where: {
        idUsuario: userId,
      },
    });
  }

  async desafioCompleto(
    challengeId: Prisma.DesafioWhereUniqueInput,
  ): Promise<DesafioCompleto> {
    return new Promise((resolve, reject) => {
      this.prisma.desafio
        .findUnique({
          where: challengeId,
        })
        .then((desafio) => {
          this.prisma.usuario
            .findUnique({
              where: { id: desafio.idUsuario },
            })
            .then((usuario) => {
              this.prisma.pesagem
                .findMany({
                  where: { idDesafio: desafio.id },
                })
                .then((pesagens) => {
                  resolve({
                    ...desafio,
                    usuario: { ...usuario },
                    pesagens: [...pesagens],
                  });
                })
                .catch((error) => {
                  reject(error);
                });
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async desafiosByDate(date: number): Promise<Desafio[]> {
    return this.prisma.desafio.findMany({
      where: {
        dataInicio: {
          lte: date,
        },
        dataFinal: {
          gte: date,
        },
      },
    });
  }

  async deleteDesafios(userId: number): Promise<Prisma.BatchPayload> {
    return this.prisma.desafio.deleteMany({
      where: {
        idUsuario: userId,
      },
    });
  }
}
