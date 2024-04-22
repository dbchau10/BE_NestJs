import { Response, response } from 'express';
import { BadRequestException, Injectable } from '@nestjs/common';
import { stringify } from 'querystring';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';
import { log } from 'console';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
@Injectable()
export class AuthService {

    constructor(private readonly usersService: UsersService,
        private jwtService: JwtService,
        private configService : ConfigService
        ) { }
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(username);
        if (user) {
            const isValid = this.usersService.isValidatePassword(pass, String(user.password));
            if (isValid) {
                return user;
            }
        }
        return null;
    }
    async login(user: IUser,response:Response) {
        const { _id, name, email, role } = user;
        const payload = {
            sub: "token login",
            iss: "from server",
            _id,
            name,
            email,
            role
        };
        const refresh_token = this.createRefreshToken(payload)
        await this.usersService.updateUserToken(refresh_token,_id);
        response.cookie('refresh_Token', refresh_token,{
          httpOnly:true,
          maxAge:ms(this.configService.get<string>('EXPIRE_REFRESH'))
        })
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token,
          user:{
            _id,
            name,
            email,
            role
          }
        };
    }
    createRefreshToken = (payload)=>{
      const refreshToken =   this.jwtService.sign(payload,{
        secret:this.configService.get<string>("JWT_REFRESH"),
        expiresIn:ms(this.configService.get<string>('EXPIRE_REFRESH'))/1000,
      });
      return refreshToken
    }
    processNewToken =  async (refresh_Token :string,response:Response) =>{
      try {
        const isValid = this.jwtService.verify(refresh_Token,{
           secret:this.configService.get<string>("JWT_REFRESH"),})
         let user = await this.usersService.findUserbyToken(refresh_Token)
        if(user){
          //update refresh token
          const { _id, name, email, role } = user;
        const payload = {
            sub: "token login",
            iss: "from server",
            _id,
            name,
            email,
            role
        };
        const refresh_token = this.createRefreshToken(payload)
        await this.usersService.updateUserToken(refresh_token,_id.toString());
        response.clearCookie("refresh_Token");
        response.cookie('refresh_Token', refresh_token,{
          httpOnly:true,
          maxAge:ms(this.configService.get<string>('EXPIRE_REFRESH'))*1000
        })
        return {
            access_token: this.jwtService.sign(payload),
            refresh_token,
          user:{
            _id,
            name,
            email,
            role
          }
        };
        }      
        else{
          throw new BadRequestException("token het han");

        }    
      } catch (error) {
        throw new BadRequestException("token het han");
        
      }
    }
    handleLogout = async (_id:string ,response:Response) =>{
       await this.usersService.updateUserToken("",_id
        
      )
      response. clearCookie("refresh_Token");
      return "ok"
    }
}
