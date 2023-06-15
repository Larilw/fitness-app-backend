import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Desafio, Prisma } from '@prisma/client';

@Injectable()
export class DesafioService {
  constructor(private prisma: PrismaService) {}

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

  async deleteDesafio(where: Prisma.DesafioWhereUniqueInput): Promise<Desafio> {
    return this.prisma.desafio.delete({
      where,
    });
  }
}
