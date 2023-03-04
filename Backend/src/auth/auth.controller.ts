import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateClientDto } from './dto/create-client.dto';
import { LoginClientDto } from './dto/login-client.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createClientDto: CreateClientDto) {
    return this.authService.create(createClientDto);
  }
  @Post('login')
  loginUser(@Body() createClientDto: LoginClientDto) {
    return this.authService.login(createClientDto);
  }
}
