import { User } from './users/schemas/user.schema';
import { Controller, Get, Post, Render, Req, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from './decorator/customize';
@Controller()
export class AppController {
  constructor(private appService: AppService,
    private authService: AuthService) { }

}
