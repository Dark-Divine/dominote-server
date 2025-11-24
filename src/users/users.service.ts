import { Inject, Injectable } from '@nestjs/common';
import { users } from './schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/database/drizzle.provider';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase,
  ) {}

  async findAll() {
    return this.db.select().from(users);
  }
}
