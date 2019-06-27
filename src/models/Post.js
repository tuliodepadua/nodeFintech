const mongoose = require('mongoose')

require('dotenv').config({
    path: __dirname+'/../.env'
   
})
 // path: __dirname+'/../.env'
 // mongoose.connect(process.env.MONGO_PROD, {
mongoose.connect(process.env.MONGO_DEV, {

    useNewUrlParser: true
})
.then(() => console.log('Conectado'))
.catch(e => console.log(e))

const PostSchema = new mongoose.Schema({
        nome: String,
        idade: Number,
        cpf: String,
        telefone: String,
        email: String,
        _status : Boolean
    },{
        timestamps: true,
    }
)

module.exports = mongoose.model('Post', PostSchema);