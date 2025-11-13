//database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../../db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
})
export class DatabaseModule {}

//local db
// {
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get<string>('HOST'),
//         port: parseInt(configService.get<string>('DB_PORT')!),
//         username: configService.get<string>('DB_USER'),
//         password: configService.get<string>('DB_PASSWORD'),
//         database: configService.get<string>('DB_NAME'),
//         autoLoadEntities: true,
//         synchronize: true,
//       }),
//     }
