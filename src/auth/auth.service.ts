import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneuser(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    
    const payload = { sub: result.id, username: result.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
