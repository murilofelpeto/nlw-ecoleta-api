import express from 'express';

const app = express();
app.use(express.json());

const users = [{"name": "Murilo"}, {"name": "Gilda"}, {"name": "Leonardo"}, {"name" : "Lucia"}, {"name":"Paulo"}];

//Map the users route
app.get('/users', (request, response) => {
    console.log('Listagem de usuários');

    //Send simple text
    //response.send("Hello World!");

    //Returns a JSON object or array of objects
    //return response.json(users);
    if(request.query.search){
        const search = String(request.query.search);
        return response.json(users.filter(user => user.name.includes(search)));
    }
    return response.json(users);
});

app.get('/users/:id', (request, response) =>{
    const id = Number(request.params.id);
    return response.json(users[id]);
});

app.post('/users', (request, response) => {
    const requestBody = request.body;
    const user = {
        name: requestBody.name,
        email: requestBody.email,
    };
    return response.status(201).json(user);
});

app.listen(3333);