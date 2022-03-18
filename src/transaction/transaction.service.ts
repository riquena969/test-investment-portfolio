import { Injectable } from '@nestjs/common';
import { stock_caches, users } from '@prisma/client';
import { MarketstackService } from 'src/marketstack/marketstack.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    private prisma: PrismaService,
    private marketstack: MarketstackService,
  ) { }

  async create(createTransactionDto: CreateTransactionDto, user: users) {
    const stockInfo: stock_caches = await this.marketstack.findBySymbol(
      createTransactionDto.symbol,
    );

    const transaction = await this.prisma.transactions.create({
      data: {
        type: createTransactionDto.operation,
        quantity: createTransactionDto.quantity,
        symbol: createTransactionDto.symbol,
        value: stockInfo.value.toNumber() * createTransactionDto.quantity,
        user_id: user.id
      }
    });

    let quantity = transaction.type == 'BUY' ? transaction.quantity : transaction.quantity * -1;

    this.updateUserStocks(user, createTransactionDto.symbol, quantity);

    return transaction;
  }

  async updateUserStocks(user: users, symbol: string, quantity: number) {
    const userStock = await this.prisma.stocks.findFirst({
      where: {
        user_id: user.id,
        symbol
      }
    });

    if (userStock === null) {
      return this.prisma.stocks.create({
        data: {
          symbol,
          name: symbol,
          amount: quantity,
          user_id: user.id
        }
      })
    }

    return this.prisma.stocks.update({
      data: {
        ...userStock,
        amount: userStock.amount + quantity
      },
      where: { id: userStock.id }
    });
  }

  findAll(userId: number) {
    return this.prisma.stocks.findMany({ where: { user_id: userId } });
  }
}
