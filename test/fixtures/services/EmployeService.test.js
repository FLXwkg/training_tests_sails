const assert = require('assert');
const sinon = require('sinon');
const EmployeDAO = require('../../../api/dao/EmployeDAO');

describe('EmployeService', function () {

  describe('#embaucherEmploye()', function () {
    it('should embaucher un technicien sans dateEmbauche', async function () {
      sinon.stub(SalaireService, "calculerSalaireBaseEmploye").callsFake(() => {return 2000})
      let stub = sinon.stub(EmployeService, "affecterEquipe").callsFake(() => {return 1})
      sinon.stub(EmployeDAO, "creerEmploye").callsFake(() => {})

      const employe = {
        fonction: 'TECHNICIEN'
      };

      const result = await EmployeService.embaucherEmploye(employe);

      assert(stub.called)
      assert.strictEqual(result.salaireBase, 2000);
      assert.strictEqual(result.equipe, 1);
    });

    it('should embaucher un technicien avec dateEmbauche', async function () {
      sinon.stub(SalaireService, "calculerSalaireBaseEmploye").callsFake(() => {return 2000})
      sinon.stub(SalaireService, "calculerSalairePeriodeEmploye").callsFake(() => {return 3000})
      let stub = sinon.stub(EmployeService, "affecterEquipe").callsFake(() => {return 1})
      sinon.stub(EmployeDAO, "creerEmploye").callsFake(() => {})

      const employe = {
        'fonction': 'TECHNICIEN',
        'dateEmbauche': '2024/01/02'
      };

      const result = await EmployeService.embaucherEmploye(employe);

      assert(stub.called)

      assert.strictEqual(result.salaireBase, 2000);
      assert.strictEqual(result.equipe, 1);
    });

    it('should embaucher un cadre sans dateEmbauche', async function () {
      sinon.stub(SalaireService, "calculerSalaireBaseEmploye").callsFake(() => {return 2000})
      let stub = sinon.stub(EmployeService, "affecterEquipe").callsFake(() => {return 1})
      sinon.stub(EmployeDAO, "creerEmploye").callsFake(() => {})

      const employe = {
        fonction: 'CADRE'
      };

      const result = await EmployeService.embaucherEmploye(employe);

      assert(!stub.called)
      assert.strictEqual(result.salaireBase, 2000);

    });

    it('should call calculerSalairePeriodeEmploye 6 times', async function () {
      sinon.stub(SalaireService, "calculerSalaireBaseEmploye").callsFake(() => {return 2000})
      let salaireStub = sinon.stub(SalaireService, "calculerSalairePeriodeEmploye").callsFake(() => {return 3000})
      let stub = sinon.stub(EmployeService, "affecterEquipe").callsFake(() => {return 1})
      sinon.stub(EmployeDAO, "creerEmploye").callsFake(() => {})
      let regulStub = sinon.stub(EmployeService, "regulariserSalairesEmploye").callsFake(() => {})


      const employe = {
        'fonction': 'TECHNICIEN',
        'dateEmbauche': '01/03/2025'
      };

      const result = await EmployeService.embaucherEmploye(employe, new Date(2025, 5, 1));

      assert(stub.called)
      assert(regulStub.withArgs([
        { annee: 2025, mois: 1, salaire: 3000 },
        { annee: 2025, mois: 2, salaire: 3000 },
        { annee: 2025, mois: 3, salaire: 3000 },
        { annee: 2025, mois: 4, salaire: 3000 },
        { annee: 2025, mois: 5, salaire: 3000 },
        { annee: 2025, mois: 6, salaire: 3000 }
      ]))

      assert.strictEqual(salaireStub.callCount, 6);

      assert.strictEqual(result.salaireBase, 2000);
      assert.strictEqual(result.equipe, 1);
    });
  });

});
