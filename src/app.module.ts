import Next from 'next';
import { RenderModule } from 'nest-next';
import { Module } from "@nestjs/common";

import { AppController } from './app.controller';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({ 
        dev: process.env.NODE_ENV !== 'production',
        conf: { useFileSystemPublicRoutes: false },
      }),
    ),
  ],
  controllers: [AppController],
})

export class AppModule { }