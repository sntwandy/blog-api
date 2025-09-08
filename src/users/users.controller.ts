import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: '2',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    },
  ];

  @Get()
  getUsers(): User[] {
    return this.users;
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) return { error: 'User not found' };
    return user;
  }

  @Post()
  createUser(@Body() body: CreateUserDTO) {
    // Check if the user already exists
    const existingUser = this.users.find((user) => user.email === body.email);
    if (existingUser) {
      return { error: 'User with this email already exists' };
    }
    // Create a new user with a unique ID
    const newUser: User = {
      ...body,
      id: (this.users.length + 1).toString(),
    };
    this.users.push(newUser);
    return {
      message: 'User created successfully',
      data: newUser,
      error: null,
    };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} found`);
    }
    const updatedUser = { ...this.users[userIndex], ...body };
    this.users[userIndex] = updatedUser;
    return {
      message: 'User updated successfully',
      data: updatedUser,
      error: null,
    };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} found`);
    }

    this.users.splice(userIndex, 1);
    return { message: 'User deleted successfully', error: null };
  }
}
