const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(express.json())

let persons = [
  {
    id: 1,
    name: "Federico Valverde",
    number: "623159874"
  },
  {
    id: 2,
    name: "Sergio Martinez",
    number: "659741289"
  },
  {
    id: 3,
    name: "Marco de la Vega",
    number: "62549832"
  },
  {
    id: 4,
    name: "Antonio Valle",
    number: "659364987"
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

//Ejercicio 1
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

//Ejercicio 2
app.get('/info', (request, response) => {
  console.log(typeof persons)
  let personas = Object.keys(persons).length;
  let fecha = new Date();
  response.send(`<p>La agenda telefónica tiene a ${personas} personas</p><p>${fecha}</p>`);
  response.send(`${fecha.getDate()}`);
})

//Ejercicio 3
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = persons.find(note => note.id === id)
  
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

//Ejercicio4
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(persona => persona.id !== id)

  response.status(204).end()
})

//Ejercicio5 y Ejercicio6

const nombrerepetido = (nombre) => {
  return Object.values(persons).includes(nombre);
}

app.post('/api/persons', (request, response) => {
  const body = request.body;

  morgan.token('body', request => JSON.stringify(request.body))

  if(!body.name){
      return response.status(400).json({
          error: 'Escribe el nombre'
      })
  } else if(!body.number){
      return response.status(400).json({
          error: 'Escribe el número de teléfono'
      })
  }

  if(!nombrerepetido(body.name)){
      return response.status(400).json({
          error: 'El nombre ya existe en la agenda'
      })
  }

  const persona = {
      id: Math.floor(Math.random() * 10000),
      name: body.name,
      number: body.number,
  }

  persons = persons.concat(persona);

  response.json(persona);
})

const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})






