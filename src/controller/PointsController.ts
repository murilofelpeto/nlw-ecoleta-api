import knex from "../database/connection";
import {Request, Response} from 'express';

class PointsController {

    async create(request:Request, response:Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        //TRX is a transaction, if one of those queries fail, the others won't execute
        const trx = await knex.transaction();
        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }
        const pointsID = await trx('points').insert(point);

        const point_id = pointsID[0];

        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) =>{
                return {
                    item_id,
                    point_id
                };
            })
        await trx('point_items').insert(pointItems)

        //Insert everything on database
        await trx.commit();
        return response.status(201)
            .json(
                {
                        id: point_id,
                        ...point
                })
            .send();
    }
    async show(request: Request, response: Response) {
        //Hide the id, because JS will get from const name
        const {id} = request.params;

        const point = await knex('points').where('id', id).first();
        if(!point){
            return response.status(400).json({message: "Point not found"}).send();
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        const serializedPoint = {
            ...point,
            image_url: 'https://nlw-ecoleta-api.herokuapp.com/uploads/point-images/' + point.image,
        };

        return response.json(
            {
                point: serializedPoint,
                items
            }
        );
    }
    async index(request: Request, response:Response) {

        const {city, uf, items} = request.query;
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: 'https://nlw-ecoleta-api.herokuapp.com/uploads/point-images/' + point.image,
            };
        });
        return response.json(serializedPoints);
    }
};


export default PointsController;