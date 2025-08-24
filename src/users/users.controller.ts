import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

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
  createUser(@Body() user: Omit<User, 'id'>) {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      name: user.name,
      email: user.email,
    };
    this.users.push(newUser);
    return {
      message: 'User created successfully',
      data: newUser,
      error: null,
    };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return { error: 'User not found' };
    }

    this.users.splice(userIndex, 1);
    return { message: 'User deleted successfully', error: null };
  }
}
