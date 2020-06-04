import Knex from "knex";
import path from "path";

const sqlLiteConnection = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true
};

const connection = Knex(sqlLiteConnection);

export default connection;