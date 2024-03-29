import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public, ResponseMessage, User } from "src/decorator/customize";
import { LocalAuthGuard } from "./local-auth.guard";
import { Request, Response } from "express";
import { JwtStrategy } from "./passport/jwt.strategy";

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService) { }
  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponseMessage("User Login")
  
  @Post('/login')
  @ResponseMessage("User Login")
  async handleLogin(@Req() req ,
  @Res({ passthrough: true }) response: Response) {
    
    return this.authService.login(req.user,response)
  }
  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
  @Get("auth/account")
  @ResponseMessage("User Login")
  decodeToken(@Req() req){
    return req.user
  }
  @Get("auth/refresh")
  @ResponseMessage("get User by refresh token")
  @Public()
  handleRefresh(@Req() request: Request,
  @Res({ passthrough: true }) response: Response){
    const {refresh_Token} = request.cookies;
    return this.authService.processNewToken(refresh_Token,response);
  }
  @Get("auth/logout")
  handleLogout(@User() userInfo,
  @Res({ passthrough: true }) response: Response){
   
    return this.authService.handleLogout(userInfo._id,response);
  }
}
