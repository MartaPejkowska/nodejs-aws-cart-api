import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { User } from '../models';
import { Users } from 'src/entity/users';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async findOne(userId: string): Promise<Users> {
    console.log('findOn')
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
  }

  async createOne({ name, password }: User): Promise<Users> {
    const id = v4();
    const newUser = { id: name || id, name, password };

    return this.userRepository.save(newUser);
  }
  // private readonly users: Record<string, User>;

  // constructor() {
  //   this.users = {}
  // }

  // findOne(userId: string): User {
  //   return this.users[ userId ];
  // }

  // createOne({ name, password }: User): User {
  //   const id = v4();
  //   const newUser = { id: name || id, name, password };

  //   this.users[ id ] = newUser;

  //   return newUser;
  // }

}
