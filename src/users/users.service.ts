import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export class User {
  id: number;
  username: string;
  password: string;
}
@Injectable()
export class UsersService {

  private readonly DBuser: User[] = [{id:1, username:'admin', password: '1234'}]
   create(createUser: User) : User{
    const already = this.DBuser.find((user) => user.username === createUser.username);
    if(already) {
      throw new NotFoundException('Your username already exist...')
    }
    createUser.id = this.DBuser.length + 1; 
    this.DBuser.push(createUser)
    return createUser
  }


  findAllUsers(): User[] {
    return this.DBuser;
  }
  findOne(id: number) {
    const data = this.DBuser.find((data) => data.id === id);
    if(data){
      return data
    }
    return {message:'Your data is Emtpy...'}
  }

  updateUser(id: number, updateUserDto: Partial<User>): User {
    const user = this.DBuser.find((data) => data.id = id);
    Object.assign(user, updateUserDto);
  if(!user) {
    throw new NotFoundException(`Not found ${id}`)
  }
  return user;
  }

  deleteUser(id: number): User[] { 
    const userIndex = this.DBuser.findIndex((user) => user.id === Number(id));
    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
     return this.DBuser.splice(userIndex, 1);
    
  }
}
