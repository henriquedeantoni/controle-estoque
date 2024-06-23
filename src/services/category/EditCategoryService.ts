import { EditCategoryRequest } from "../../models/interfaces/category/EditCategory";
import prismaClient from "../../prisma";

class EditCategoryService {

    async execute({name, category_id}: EditCategoryRequest) {
        if( category_id === " " || !category_id || name === " " || !name){
            throw new Error("Invalid arguments to edit Category!");
        }

        const productEdit = await prismaClient.category.update({
            where: {
                id: category_id
            },
            data: {
                name: name
            },
    });
    return productEdit; 
    }
}

export {EditCategoryService}