const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Configurações customizadas
const rules = jsonServer.rewriter({
  '/api/*': '/$1',
  '/posts/:id/comments': '/comments?postId=:id'
})

server.use(middlewares)
server.use(rules)
server.use(router)

const PORT = process.env.PORT || 3001
server.listen(PORT, () => {
  console.log(`JSON Server está rodando na porta ${PORT}`)
}) 