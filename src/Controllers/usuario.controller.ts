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
import { parseISO } from 'date-fns';

@Controller()
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('criarUsuario')
  async createUser(
    @Body()
    userData: {
      idFirebase: number;
      genero: string;
      dataNascimento: string;
      pesoInicial: number;
      altura: number;
    },
  ): Promise<UsuarioModel> {
    const { idFirebase, genero, dataNascimento, pesoInicial, altura } =
      userData;

    // Converter a string para DateTime
    const dataNascimentoParsed = parseISO(dataNascimento);
    return this.usuarioService.createUsuario({
      idFirebase,
      genero,
      dataNascimento: dataNascimentoParsed,
      pesoInicial,
      altura,
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

  @Get('usuario/:id/desafios')
  async getDesafiosByUserId(@Param('id') id: string): Promise<Desafio[]> {
    return this.usuarioService.desafiosByUserId(Number(id));
  }

  @Get('usuario/:id/pesagens')
  async getPesagensByUserId(@Param('id') id: string): Promise<Pesagem[]> {
    return this.usuarioService.pesagensByUserId(Number(id));
  }

  @Delete('deletarUsuario/:id')
  async deleteUser(@Param('id') id: string): Promise<UsuarioModel> {
    return this.usuarioService.deleteUsuario({ id: Number(id) });
  }
}