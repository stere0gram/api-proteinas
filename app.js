const express = require('express')
const bodyParser = require('body-parser')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc = require('./swagger.ts')
const app = express()
const db = require('./crud')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use('/api-doc',swaggerUI.serve,swaggerUI.setup(swaggerDoc.swaggerDocument));
app.set('json spaces', 2)
app.get('/', (req, res) => {
  req.json({ info: 'Api para pesquisa de proteínas. Para o swaggerUI, utilize o endpoint /api-doc' })
})

app.get('/proteins/:initialLimit?/:finalLimit?/:Offset?', 
db.getProteins)

app.get('/protein/:id?', db.getProteinById)

app.listen(port, () => {
  console.log(`Aplicação rodando na porta ${port}.`)
})