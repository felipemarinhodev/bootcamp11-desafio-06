import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateCategoryService from './CreateCategoryService';
import BalanceTransactionService from './BalanceTransactionService';

interface Request {
  value: string;
  title: string;
  type: 'income' | 'outcome';
  category: string;
}
class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRespository = getCustomRepository(TransactionsRepository);

    const createCategoryService = new CreateCategoryService();

    const categorySaved = await createCategoryService.execute({
      title: category,
    });

    const valueTransaction = Number(value);

    if (type === 'outcome') {
      const balanceTransactionService = new BalanceTransactionService();
      const { total } = await balanceTransactionService.execute();
      if (total < valueTransaction) {
        throw new AppError(
          'You do not have a balance for this transaction.',
          400,
        );
      }
    }

    const transaction = transactionRespository.create({
      title,
      value: valueTransaction,
      type,
      category: categorySaved.id,
    });

    await transactionRespository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
