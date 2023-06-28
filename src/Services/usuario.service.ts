import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Usuario, Prisma, Desafio, Pesagem } from '@prisma/client';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async usuario(
    usuarioWhereUniqueInput: Prisma.UsuarioWhereUniqueInput,
  ): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: usuarioWhereUniqueInput,
    });
  }

  async usuarioAuth(userLoginId: number): Promise<Usuario | null> {
    return this.prisma.usuario.findFirst({
      where: {
        idFirebase: userLoginId,
      },
    });
  }

  async usuarioEmail(userEmail: string): Promise<Usuario | null> {
    return this.prisma.usuario.findFirst({
      where: {
        email: userEmail,
      },
    });
  }

  async login(
    userEmail: string,
    userPassword: string,
  ): Promise<Usuario | null> {
    return this.prisma.usuario.findFirst({
      where: {
        email: userEmail,
        senha: userPassword,
      },
    });
  }

  async usuarios(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UsuarioWhereUniqueInput;
    where?: Prisma.UsuarioWhereInput;
    orderBy?: Prisma.UsuarioOrderByWithRelationInput;
  }): Promise<Usuario[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.usuario.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUsuario(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    data.dataNascimento = new Date(Number(data.dataNascimento)).getTime();

    return this.prisma.usuario.create({
      data,
    });
  }

  async updateUsuario(params: {
    where: Prisma.UsuarioWhereUniqueInput;
    data: Prisma.UsuarioUpdateInput;
  }): Promise<Usuario> {
    const { where, data } = params;
    return this.prisma.usuario.update({
      data,
      where,
    });
  }

  async deleteUsuario(where: Prisma.UsuarioWhereUniqueInput): Promise<Usuario> {
    return this.prisma.usuario.delete({
      where,
    });
  }
}
