import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { stock_caches } from '@prisma/client';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MarketstackService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) { }

  async findBySymbol(symbol: string) {
    let limitCache = new Date();
    limitCache.setDate(limitCache.getDate() - 1);

    const cachedResponse = await this.prisma.stock_caches.findMany({
      where: {
        symbol,
        created_at: { gte: limitCache },
      },
    });

    if (cachedResponse.length) {
      return cachedResponse[0];
    }

    const response = await this.getFromMarketStack(symbol);

    return this.prisma.stock_caches.create({
      data: { symbol, value: response.data[0].close },
    });
  }

  async findMany(symbols: string[]) {
    let apiUrl = `http://api.marketstack.com/v1/eod/latest`;

    let returnedData = (
      await firstValueFrom(
        this.httpService.get(apiUrl, {
          params: {
            access_key: process.env.TOKEN_MARKETSTACK,
            symbols: symbols.join(',')
          },
        }),
      )
    ).data;

    returnedData.data.forEach(async (stock) => {
      return this.prisma.stock_caches.create({
        data: { symbol: stock.symbol, value: stock.close },
      });
    });

    return returnedData;
  }

  async getFromMarketStack(symbol: string) {
    let apiUrl = `http://api.marketstack.com/v1/eod/latest`;

    return (
      await firstValueFrom(
        this.httpService.get(apiUrl, {
          params: {
            access_key: process.env.TOKEN_MARKETSTACK,
            symbols: symbol
          },
        }),
      )
    ).data;
  }
}
