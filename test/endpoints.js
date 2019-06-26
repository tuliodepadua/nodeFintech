
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
    request.get(
      {
        url : urlBase + "/cards?name=Heedless One" 
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

        // sucesso (200)?
        expect(response.statusCode).to.equal(200);

        // agora, verificamos se retornou a propriedade cards
        if( _body.should.have.property('cards') ){
          //como filtramos, queremos que retorne pelo menos 1, pois existem varias versoes da mesma carta 
          expect(_body.cards).to.have.lengthOf.at.least(1);

          //faz a verificacao na primeira carta
          if(_body.cards[0].should.have.property('artist')){
            expect(_body.cards[0].artist).to.equal('Mark Zug');
          }
          if(_body.cards[0].should.have.property('name')){
            expect(_body.cards[0].name).to.equal('Heedless One');
          }
        }

        done(); // avisamos o test runner que acabamos a validação e já pode proseeguir
      }
    );
  });
});