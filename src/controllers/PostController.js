
const Post = require('../models/Post')
const Valid = require('../utils/Validadores')
// 
module.exports = {
    async buscar(req, res){
        let { busca } = req.body; 
        if (isNaN(Number(busca))) {
            if (busca.length > 2 ) {
                const busc =  await Post.find({ "nome" : {"$regex": String(busca), "$options": "i"}, "_status": "true"}, function (err, adventure) {
                    return res.json(
                        adventure 
                    )
                });
            }
        } else {
            const busc =  await Post.findOne({ "cpf": busca }, function (err, adventure) {
                return res.json([
                    adventure
                ]
                )
            });
        }
    },
    async buscarId(req, res){
        let id = req.params.id; 
        const busc =  await Post.findById(id, function (err, adventure) {
            return res.json(
                adventure 
            )
        });
    },
    async index(req, res){
        let init = req.params.pg * 4;
         
        const posts = await Post.find({ _status : true})
        .sort('-createdAt').skip(init)
        .limit(4)
        return res.json(posts)
    },
    async deletar(req, res){
        let id = req.params.id
        const posts = await Post.findByIdAndUpdate( id, { _status : false })
        return res.json(posts)
    },
    async atualizar(req, res){

        let id = req.params.id;
        let corpo = req.body;
        let { nome, idade, cpf, telefone , email } = corpo;
        
        let error = [];
        if (nome.indexOf(' ') != -1) {
            let teste = nome.split(' ');
            if (teste[0].length < 3 || teste[1].length == 0) {
                error.push('Nome')
            }
        }else{
            error.push('Nome')
        }

        if (isNaN(Number(idade))) {
            error.push('Idade')
        }

        telefone = telefone.replace(/[^0-9]/g, "")

        telefone.length == 10 || telefone.length == 11 ?  '' : error.push({campo: "Telefone" , valor : telefone }) 
    
        Valid.CPF(cpf) == 1 ? error.push('CPF') : ""
        Valid.email(email) == 1 ? error.push('E-mail') : ""
            if (error.length == 0) {
                cpf = cpf.replace(/[^0-9]/g, "");
                try {
                    const post = await Post.findByIdAndUpdate( id, { 
                        nome, idade, cpf, telefone , email, _status : true
                    })
        
                    // req.io.emit('post', post)

                    if (!post) {
                        return res.status(404).send('Usuário não encontrado.');
                    } else {
                        return res.status(201).send('Sucesso.');
 
                    }        
                } catch (e) {
                    return res.json('err')
                }
        } else {
            return res.json( { error } )
        }
    },

    async store(req, res){
        
        let { nome, idade, cpf, telefone , email } = req.body;
        let error = [];
        if (nome.indexOf(' ') != -1) {
            let teste = nome.split(' ');
            if (teste[0].length < 3 || teste[1].length == 0) {
                error.push('Nome')
            }
        }else{
            error.push('Nome')
        }

        if (isNaN(Number(idade))) {
            error.push('Idade')
        }

        telefone = telefone.replace(/[^0-9]/g, "")

        telefone.length == 10 ||  telefone.length == 11 ? '' : error.push('Telefone') 
    
        Valid.CPF(cpf) == 1 ? error.push('CPF') : ""
        Valid.email(email) == 1 ? error.push('E-mail') : ""
        
        if (error.length == 0) {
            
            cpf = cpf.replace(/[^0-9]/g, "");
            let buscaCPF = await Post.findOne({ cpf }, function (err, adventure) { });
            if (buscaCPF == null ) {
                try {
                    const post = await Post.create({ 
                        nome, idade, cpf, telefone , email, _status : true
                    })
                    // req.io.emit('post', post)
                    // return res.json( post )
                    if (!post) {
                        return res.status(404).send('Não foi possível cadastrar usuário.');
                    } else {
                        return res.status(201).send('Usuário cadastrado com sucesso !');
 
                    }
                } catch (e) {
                    return res.json('err')
                }
        } else{
            if (buscaCPF._status == false) {
                const post = await Post.findByIdAndUpdate( buscaCPF._id, { 
                    nome, idade, cpf, telefone , email, _status : true
                })
                return res.status(201).send(`Usuário alterado e reativado`);           
            } else {
                return res.status(409).send(`CPF já cadastrado e ativo no usuário ${buscaCPF.nome}`);
            }
        }
        } else {
            return res.status(403).send(`Erro nas seguintes informações ${error.join(', ')}`);
        }
    }
}