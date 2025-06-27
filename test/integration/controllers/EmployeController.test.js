const supertest = require("supertest");
const assert = require("assert")


describe('EmployeController', function(){
  describe('#liste', function(){
    it('should display employee list', function(done){
      supertest(sails.hooks.http.app)
      .get('/employe/liste')
      .expect(200)
      .end(done);
    })
  })

  describe('#embaucher', function(){
    it('doit creer un employe', async function () {
      await supertest(sails.hooks.http.app)
          .post('/employe/embaucher')
          .send({ nom: "John15252", prenom: "Doe6363", experience: 5, fonction: "CADRE", position: 3 })
          .expect(302)
          .expect('location', '/employe/liste')

      let e = await Employe.findOne({ nom: "John15252", prenom: "Doe6363" });
      assert(!!e.id)
    })
  })
})
