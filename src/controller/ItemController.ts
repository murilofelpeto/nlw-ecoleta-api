import knex from "../database/connection";
import {Request, Response} from "express";

class ItemController {
    async index(request: Request, response: Response) {
        //Every query we use with knex we must use AWAIT and ASYNC as well;
        const items = await knex('items').select('*');
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: 'http://192.168.15.23:3333/uploads/images/' + item.image,
            };
        });

        return response.json(serializedItems);
    }
};

export default ItemController;