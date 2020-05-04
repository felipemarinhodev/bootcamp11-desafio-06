import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Response {
  transactions: Transaction[];
  balance: {
    income: number;
    outcome: number;
    total: number;
  };
}

class BalanceTransactionService {
  public async execute(): Promise<Response> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const balance = await transactionRepository.getBalance();
    const transactions = await transactionRepository.find();

    return {
      transactions,
      balance,
    };
  }
}

export default BalanceTransactionService;
