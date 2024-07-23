import prismaClient from "../../prisma/index";

interface ListProductByCategoryIdRequest{
    category_id: string;

}

class ListProductService {
    async execute() {
        const products = await prismaClient.product.findMany({
            select: {
                id: true,
                name: true,
                amount: true
            },
            orderBy: {
                created_at: 'desc'
            },
        });
        return products;
    }
}

export {ListProductService}