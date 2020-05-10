import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Response {
  income: number;
  outcome: number;
  total: number;
}

class BalanceTransactionService {
  public async execute(): Promise<Response> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const balance = await transactionRepository.getBalance();

    return balance;
  }
}

export default BalanceTransactionService;
