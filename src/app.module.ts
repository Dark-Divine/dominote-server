import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './base/configs/env.validation';
import databaseConfig from './base/configs/database.config';
import { DatabaseModule } from './database/database.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      load: [databaseConfig],
    }),
    DatabaseModule,
    UserModule,
    WorkspaceModule,
    ProjectModule,
  ],
})
export class AppModule {}
