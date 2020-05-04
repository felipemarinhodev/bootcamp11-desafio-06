import { Router } from 'express';

import CreateCategoryService from '../services/CreateCategoryService';

const catogoriesRouter = Router();

catogoriesRouter.post('/', async (request, response) => {
  try {
    const { title } = request.body;
    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({ title });
    return response.send(category);
  } catch (error) {
    return response.status(400).json({ message: 'Deu ruim', error });
  }
});

export default catogoriesRouter;
