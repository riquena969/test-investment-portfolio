import { BadRequestException, Injectable } from '@nestjs/common';
import { MarketstackService } from 'src/marketstack/marketstack.service';
import { GenerateSuggestionDto } from './dto/generate-suggestion.dto';

@Injectable()
export class SuggestionService {
  constructor(private marketstackService: MarketstackService) { }

  async findAll({ value }: GenerateSuggestionDto) {

    let pretentedValue = parseFloat(value);

    if (isNaN(pretentedValue)) {
      throw new BadRequestException("Invalid number on value");
    }

    const actualValues = await this.marketstackService.findMany([
      'MSFT',
      'AAPL',
      'NKE',
      'BTC',
      'ETH'
    ]);

    let returnValues = [];

    actualValues.data.forEach((stock) => {
      if (stock.close > pretentedValue) {
        return;
      }

      returnValues.push({
        symbol: stock.symbol,
        unitary_value: stock.close,
        total_value: Math.floor(pretentedValue / stock.close) * stock.close,
        quantity: Math.floor(pretentedValue / stock.close)
      });
    });

    return returnValues;
  }
}
