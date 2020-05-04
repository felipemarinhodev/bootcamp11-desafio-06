import { Router } from 'express';

import CreateTransactionService from '../services/CreateTransactionService';
import BalanceTransactionService from '../services/BalanceTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const balanceTransactionService = new BalanceTransactionService();
  const balance = await balanceTransactionService.execute();
  return response.json(balance);
});

transactionsRouter.post('/', async (request, response) => {
  try {
    const { title, value, type, category } = request.body;
    const createTransactionService = new CreateTransactionService();
    const transaction = await createTransactionService.execute({
      title,
      value,
      type,
      category,
    });

    return response.send(transaction);
  } catch (error) {
    return response
      .status(400)
      .json({ message: 'Erro ao salvar uma transaction', error });
  }
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
