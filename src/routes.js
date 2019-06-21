const express = require('express')
// const multer = require('multer')


const PostController = require('./controllers/PostController')
// const LikeController = require('./controllers/LikeController')

const routes = new express.Router()

// const upload = multer(uploadConfig); 

routes.post('/buscar',  PostController.buscar)
routes.get('/usuarios/:pg', PostController.index)
routes.delete('/registro/:id/delete', PostController.deletar)
routes.get('/busca/:id/', PostController.buscarId)
routes.put('/registro/:id/atualizar', PostController.atualizar)
routes.post('/registro',  PostController.store)


// routes.post('/posts/:id/like', LikeController.store)

// routes.get('/', (req, res) => {
//     return res.send(`Hello ${req.query.name}`)
// });

module.exports = routes;