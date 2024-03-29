import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [
      ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
      UsersModule,
    ],
  })
  export class AppModule {}