import { getRepository } from 'typeorm';
import Category from '../models/Category';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: Request): Promise<Category> {
    const categoryRepository = getRepository(Category);

    let categorySaved = await categoryRepository.findOne({
      where: { title },
    });

    if (!categorySaved) {
      const category = categoryRepository.create({
        title,
      });
      await categoryRepository.save(category);
      categorySaved = category;
    }

    return categorySaved;
  }
}

export default CreateCategoryService;
