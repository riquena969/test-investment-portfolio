import { Controller, Get, Query } from '@nestjs/common';
import { SuggestionService } from './suggestion.service';
import { GenerateSuggestionDto } from './dto/generate-suggestion.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags("Suggestion")
@Controller('suggestion')
export class SuggestionController {
  constructor(private readonly suggestionService: SuggestionService) { }

  @Get()
  @ApiParam({ name: 'value' })
  findAll(@Query() generateSuggestionDto: GenerateSuggestionDto) {
    return this.suggestionService.findAll(generateSuggestionDto);
  }
}
