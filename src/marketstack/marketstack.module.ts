import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MarketstackService } from './marketstack.service';

@Module({
  imports: [PrismaModule, HttpModule],
  providers: [MarketstackService],
  exports: [MarketstackService],
})
export class MarketstackModule {}
