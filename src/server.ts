import express from 'express';

const app = express();

//Map the users route
app.get('/users', (request, response) => {
    console.log('Listagem de usuários');

    //Send simple text
    //response.send("Hello World!");

    //Returns a JSON object or array of objects
    response.json([{"name": "Murilo"}, {"name": "Gilda"}, {"name": "Leonardo"}, {"name" : "Lucia"}, {"name":"Paulo"}])
});

app.listen(3333);