import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { MarketstackModule } from './marketstack/marketstack.module';
import { AuthModule } from './auth/auth.module';
import { SuggestionModule } from './suggestion/suggestion.module';

@Module({
  imports: [UserModule, TransactionModule, MarketstackModule, AuthModule, SuggestionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
