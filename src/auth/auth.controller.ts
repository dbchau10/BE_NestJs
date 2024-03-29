import { Controller, Get, Post, Req, Request, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public, ResponseMessage } from "src/decorator/customize";
import { LocalAuthGuard } from "./local-auth.guard";
import { Response } from "express";
import { JwtStrategy } from "./passport/jwt.strategy";

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService) { }
  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage("User Login")
  
  @Post('/login')
  async handleLogin(@Request() req ,
  @Res({ passthrough: true }) response: Response) {
    
    return this.authService.login(req.user,response)
  }
  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Get("auth/account")
  decodeToken(@Request() req){
    return req.user
  }

}
