import { Module } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';
import { SuggestionController } from './suggestion.controller';
import { MarketstackModule } from 'src/marketstack/marketstack.module';

@Module({
  controllers: [SuggestionController],
  providers: [SuggestionService],
  imports: [MarketstackModule]
})
export class SuggestionModule { }
