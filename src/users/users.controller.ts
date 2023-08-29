import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { User, UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createUser: User) {
    return this.usersService.create(createUser);
  }

  @Get()
  findAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: Partial<User>): User {
    return this.usersService.updateUser(id, updateUserDto);
  }
  
  @Delete(':id')
  deleteUser(@Param('id') id: number): User[] {
    return this.usersService.deleteUser(id);
  }
}
