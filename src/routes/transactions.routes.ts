import { getCustomRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import BalanceTransactionService from '../services/BalanceTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';
import TransactionsRepository from '../repositories/TransactionsRepository';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = getCustomRepository(TransactionsRepository);
  const transactions = await transactionRepository.find();
  const balanceTransactionService = new BalanceTransactionService();
  const balance = await balanceTransactionService.execute();
  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;
  const createTransactionService = new CreateTransactionService();
  const transaction = await createTransactionService.execute({
    title,
    value,
    type,
    category,
  });

  return response.send(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const transaction_id = request.params.id;
  const deleteTransctionService = new DeleteTransactionService();
  await deleteTransctionService.execute({ transaction_id });
  return response.status(204).send();
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importTransactionsService = new ImportTransactionsService();
    const transactions = await importTransactionsService.execute({
      fileName: `${request.file.filename}`,
    });
    // Explicação da resolução
    // const transactions = await importTransactionsService.execute(
    //   request.file.path,
    // );

    return response.json(transactions);
  },
);

export default transactionsRouter;
