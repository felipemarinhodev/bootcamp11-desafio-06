import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const initValue = 0;
    const transactionsIncome = this.find({ where: { type: 'income' } });
    const transactionsOutcome = this.find({ where: { type: 'outcome' } });

    const totalIncome = (await transactionsIncome).reduce(
      (sum, transaction) => {
        return sum + transaction.value;
      },
      initValue,
    );
    const totalOutcome = (await transactionsOutcome).reduce(
      (sum, transaction) => {
        return sum + transaction.value;
      },
      initValue,
    );

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };
  }
}

export default TransactionsRepository;
