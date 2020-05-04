import { getRepository } from 'typeorm';
// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  value: string;
  type: string;
  category: number;
}
class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRespository = getRepository(Transaction);

    const categoryRepository = getRepository(Category);

    const categorySaved = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!categorySaved) {
      throw new Error('Does not exist category informed.');
    }

    const transaction = transactionRespository.create({
      title,
      value,
      type,
      category: categorySaved.id,
    });

    await transactionRespository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
