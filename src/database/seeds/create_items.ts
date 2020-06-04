import Knex from "knex";

const baterias = {title: 'Baterias', image: 'baterias.svg'};
const eletronicos = {title: 'Eletrônicos', image: 'eletronicos.svg'};
const lampadas = {title: 'Lâmpadas', image: 'lampadas.svg'};
const oleo = {title: 'Óleo', image: 'oleo.svg'};
const organicos = {title: 'Resíduos Orgânicos', image: 'organicos.svg'};
const papeis_papelao = {title: 'Papés e Papelão', image: 'papeis-papelao.svg'};

const arrayItems = [baterias,eletronicos,lampadas,oleo, organicos,papeis_papelao];

export async function seed(knex: Knex) {
    await knex('items').insert(arrayItems);
}