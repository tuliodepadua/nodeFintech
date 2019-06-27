
var should = require("should");
var request = require("request");
var chai = require("chai");
var expect = chai.expect;
var urlBase = "https://damp-crag-21009.herokuapp.com";

// Criamos nosso primeiro caso de teste e fornecemos uma descricao utilizando describe
describe("CRUD de usuários",function(){

  it("Deve receber 4 usuários",function(done){
    request.get(
      {
        url: urlBase + "/usuarios/0"
      },
      function(error, response, body){
        // precisamos converter o retorno para um objeto json
        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }
        expect(response.statusCode).to.equal(200);
        expect(_body).to.have.lengthOf.at.most(4);
        done();
      }
    );
  });

  

  it("Busca por nome",function(done){
    // .form({key:'value'})
    request.post(
      {
        url : urlBase + "/buscar",
        data : {
          busca: "Tulio d"
        }
      },
      function(error, response, body){
        var _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }
        expect(response.statusCode).to.equal(200);
        done(); 
      }
    );
  });
});