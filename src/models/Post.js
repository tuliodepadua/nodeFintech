const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/desafio', {
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