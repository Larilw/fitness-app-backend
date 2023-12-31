import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UsuarioService } from '../Services/usuario.service';
import { Desafio, Pesagem, Usuario as UsuarioModel } from '@prisma/client';

@Controller()
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('criarUsuario')
  async createUser(
    @Body()
    userData: {
      idFirebase: number;
      genero: string;
      dataNascimento: number;
      pesoInicial: number;
      altura: number;
      nome: string;
      email: string;
      senha: string;
    },
  ): Promise<UsuarioModel> {
    const {
      idFirebase,
      genero,
      dataNascimento,
      pesoInicial,
      altura,
      nome,
      email,
      senha,
    } = userData;

    return this.usuarioService.createUsuario({
      idFirebase,
      genero,
      dataNascimento: new Date(dataNascimento).getTime(),
      pesoInicial,
      altura,
      nome,
      email,
      senha,
    });
  }

  @Get('usuarios')
  async getUsuarios(): Promise<UsuarioModel[]> {
    return this.usuarioService.usuarios({});
  }

  @Get('usuario/:id')
  async getUsuarioById(@Param('id') id: string): Promise<UsuarioModel> {
    return this.usuarioService.usuario({ id: Number(id) });
  }

  @Get('usuarioAuth/:id')
  async getUsuarioByAuthId(@Param('id') id: string): Promise<UsuarioModel> {
    return this.usuarioService.usuarioAuth(Number(id));
  }

  @Get('usuarioEmail/:id')
  async getUsuarioByEmail(@Param('id') email: string): Promise<UsuarioModel> {
    return this.usuarioService.usuarioEmail(email);
  }

  @Get('login/:email/:senha')
  async getUsuarioByEmailAndSenha(
    @Param('email') email: string,
    @Param('senha') senha: string,
  ): Promise<UsuarioModel> {
    return this.usuarioService.login(email, senha);
  }

  @Delete('deletarUsuario/:id')
  async deleteUser(@Param('id') id: string): Promise<UsuarioModel> {
    return this.usuarioService.deleteUsuario({ id: Number(id) });
  }
}
