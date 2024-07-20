import prismaClient from "../../prisma";
import {EditProductRequest} from '../../models/interfaces/product/EditProductRequest';

class EditProductService {

    async execute({
        name, 
        price, 
        description, 
        banner, 
        product_id, 
        amount}: EditProductRequest) {

            const productEdited = await prismaClient.product.update({
                where: {
                    id: product_id
                },
                data: {
                    name: name,
                    price: price,
                    description: description,
                    banner: banner,
                    amount: +amount
                },
            });
            return productEdited;
        }
}

export {EditProductService}
