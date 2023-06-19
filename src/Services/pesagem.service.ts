import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Pesagem, Prisma } from '@prisma/client';

@Injectable()
export class PesagemService {
  constructor(private prisma: PrismaService) {}

  async pesagem(
    pesagemWhereUniqueInput: Prisma.PesagemWhereUniqueInput,
  ): Promise<Pesagem | null> {
    return this.prisma.pesagem.findUnique({
      where: pesagemWhereUniqueInput,
    });
  }

  async pesagens(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PesagemWhereUniqueInput;
    where?: Prisma.PesagemWhereInput;
    orderBy?: Prisma.PesagemOrderByWithRelationInput;
  }): Promise<Pesagem[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.pesagem.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPesagem(data: Prisma.PesagemCreateInput): Promise<Pesagem> {
    data.dataPesagem = new Date(Number(data.dataPesagem)).getTime();
    return this.prisma.pesagem.create({
      data,
    });
  }

  async updatePesagem(params: {
    where: Prisma.PesagemWhereUniqueInput;
    data: Prisma.PesagemUpdateInput;
  }): Promise<Pesagem> {
    const { data, where } = params;
    return this.prisma.pesagem.update({
      data,
      where,
    });
  }

  async deletePesagem(where: Prisma.PesagemWhereUniqueInput): Promise<Pesagem> {
    return this.prisma.pesagem.delete({
      where,
    });
  }

  async pesagensByChallengeId(challengeId: number): Promise<Pesagem[]> {
    return this.prisma.pesagem.findMany({
      where: {
        idDesafio: challengeId,
      },
    });
  }

  async pesagensByUserId(userId: number): Promise<Pesagem[]> {
    return this.prisma.pesagem.findMany({
      where: {
        desafio: {
          idUsuario: userId,
        },
      },
    });
  }
}
