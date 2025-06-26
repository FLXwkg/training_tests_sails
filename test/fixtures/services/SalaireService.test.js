var assert = require('assert');
const SalaireService = require('../../../api/services/SalaireService');

describe('SalaireService', function() {

  describe('#calculerSalaireBaseEmploye()', function() {
    it('should return 1870 for a rank 2 technicien over 5 years old', function (done) {
      const employe = {
        'fonction': 'TECHNICIEN',
        'position': 2,
        'experience': 5
      }
      const expectedSalaire = 1600;

      const salaire = SalaireService.calculerSalaireBaseEmploye(employe)

      if (salaire !== expectedSalaire) {
        return done(new Error(
          'Should return exactly 1600 €' +
          'But instead, got: '+salaire+''
        ));
      }
      assert.equal(salaire, expectedSalaire);

      return done();
    });
    it('should return 1870 for a rank 5 cadre superieur over 8 years old', function (done) {
      const employe = {
        'fonction': 'CADRE_SUPERIEUR',
        'position': 5,
        'experience': 8
      }
      const expectedSalaire = 4002;

      const salaire = SalaireService.calculerSalaireBaseEmploye(employe)

      if (salaire !== expectedSalaire) {
        return done(new Error(
          'Should return exactly 4002 €' +
          'But instead, got: '+salaire+''
        ));
      }
      assert(salaire === expectedSalaire);

      return done();
    });
    it('should return 1870 for a rank 5 technicien over 5 years old', function (done) {
      const employe = {
        'fonction': 'TECHNICIEN',
        'position': 5,
        'experience': 5
      }
      const expectedSalaire = 1870;

      const salaire = SalaireService.calculerSalaireBaseEmploye(employe)

      if (salaire !== expectedSalaire) {
        return done(new Error(
          'Should return exactly 1870 €' +
          'But instead, got: '+salaire+''
        ));
      }
      assert(salaire === expectedSalaire);

      return done();
    });

    it('should throw an error because the fonction is missing', function (done) {
      const employe = {
        'position': 5,
        'experience': 5
      }
      assert.throws(() => {
        SalaireService.calculerSalaireBaseEmploye(employe);
      }, /La fonction n'existe pas : /);

      return done();
    });

    it('should throw an error because the fonction is not in the Grille', function (done) {
      const employe = {
        'fonction': 'TECHNICHIEN',
        'position': 5,
        'experience': 5
      }
      assert.throws(() => {
        SalaireService.calculerSalaireBaseEmploye(employe);
      }, /La fonction n'existe pas : TECHNICHIEN/);

      return done();
    });
  });

  describe('#calculerSalairePeriodeEmploye()', function() {
    it('should return 1877 for the period 01/05/2020 to 01/01/2024 for a technicien with 1652 base salary and 155h sup', function (done) {
      const employe = {
        'fonction': 'TECHNICIEN',
        'salaireBase' : 1652,
        'dateEmbauche' : new Date('01/05/2020')
      }
      const periode = {
        'jour': 1,
        'mois': 1,
        'annee': 2024
      }
      const expectedSalaire = 1877;

      const salaire = SalaireService.calculerSalairePeriodeEmploye(employe, periode, 155)

      if (salaire !== expectedSalaire) {
        return done(new Error(
          'Should return exactly 1877 €' +
          'But instead, got: '+salaire+''
        ));
      }
      assert(salaire === expectedSalaire);

      return done();
    });

    it('should return 2297 for the period 01/05/2020 to 01/01/2024 for a technicien with 1652 base salary and 190h sup', function (done) {
      const employe = {
        'fonction': 'TECHNICIEN',
        'salaireBase' : 1652,
        'dateEmbauche' : new Date('01/05/2020')
      }
      const periode = {
        'jour': 1,
        'mois': 1,
        'annee': 2024
      }
      const expectedSalaire = 2297;

      const salaire = SalaireService.calculerSalairePeriodeEmploye(employe, periode, 190)

      if (salaire !== expectedSalaire) {
        return done(new Error(
          'Should return exactly 2297 €' +
          'But instead, got: '+salaire+''
        ));
      }
      assert(salaire === expectedSalaire);

      return done();
    });


    it('should return 2297 for the period 01/05/2020 to 01/01/2024 for a technicien with 1652 base salary and 220h sup', function (done) {
      const employe = {
        'fonction': 'TECHNICIEN',
        'salaireBase' : 1652,
        'dateEmbauche' : new Date('01/05/2020')
      }
      const periode = {
        'jour': 1,
        'mois': 1,
        'annee': 2024
      }
      const expectedSalaire = 2297;

      const salaire = SalaireService.calculerSalairePeriodeEmploye(employe, periode, 220)

      if (salaire !== expectedSalaire) {
        return done(new Error(
          'Should return exactly 2297 €' +
          'But instead, got: '+salaire+''
        ));
      }
      assert(salaire === expectedSalaire);

      return done();
    });

    it('should return 2607 for the period 01/05/2020 to 01/01/2024 for a cadre superieur with 2562 base salary and 220h sup', function (done) {
      const employe = {
        'fonction': 'CADRE_SUPERIEUR',
        'salaireBase' : 2562,
        'dateEmbauche' : new Date('01/05/2020')
      }
      const periode = {
        'jour': 1,
        'mois': 1,
        'annee': 2024
      }
      const expectedSalaire = 2607;

      const salaire = SalaireService.calculerSalairePeriodeEmploye(employe, periode, 220)

      if (salaire !== expectedSalaire) {
        return done(new Error(
          'Should return exactly 2297 €' +
          'But instead, got: '+salaire+''
        ));
      }
      assert(salaire === expectedSalaire);

      return done();
    });

    it('should return 2607 for the period 01/05/2020 to 01/01/2024 for a cadre superieur with 2562 base salary and 220h sup', function (done) {
      const employe = {
        'fonction': 'CADRE_SUPERIEUR',
        'salaireBase' : 2562,
        'dateEmbauche' : new Date('10/02/2023')
      }
      const periode = {
        'jour': 1,
        'mois': 1,
        'annee': 2024
      }
      const expectedSalaire = 2562;

      const salaire = SalaireService.calculerSalairePeriodeEmploye(employe, periode, 220)

      if (salaire !== expectedSalaire) {
        return done(new Error(
          'Should return exactly 2297 €' +
          'But instead, got: '+salaire+''
        ));
      }
      assert(salaire === expectedSalaire);

      return done();
    });

    it('should return 2562 for the period 10/02/2023 to 01/01/2024 for a technicien with 2562 base salary and 100h sup', function (done) {
      const employe = {
        'fonction': 'TECHNICIEN',
        'salaireBase' : 2562,
        'dateEmbauche' : new Date('10/02/2023')
      }
      const periode = {
        'jour': 1,
        'mois': 1,
        'annee': 2024
      }
      const expectedSalaire = 2562;

      const salaire = SalaireService.calculerSalairePeriodeEmploye(employe, periode, 100)

      if (salaire !== expectedSalaire) {
        return done(new Error(
          'Should return exactly 2297 €' +
          'But instead, got: '+salaire+''
        ));
      }
      assert(salaire === expectedSalaire);

      return done();
    });

    it('should throw an error because the periode is anterior to dateEmbauche', function (done) {
      const employe = {
        'fonction': 'TECHNICIEN',
        'salaireBase' : 2562,
        'dateEmbauche' : new Date(2023, 1, 10, 12, 0, 0)
      }
      const periode = {
        'jour': 1,
        'mois': 1,
        'annee': 2023
      }

      assert.throws(() => {
        SalaireService.calculerSalairePeriodeEmploye(employe, periode, 140);
      }, /La période 2023-01-01 est antérieure à la date d'embauche 2023-02-10/);

      return done();
    });
  })

  describe('#trouverSalairesHorsNormes()', function() {
    it('should return employe 1', function (done) {
      const employes = [{
        'fonction': 'TECHNICIEN',
        'position': 3,
        'salaireBase' : 1652,
        'dateEmbauche' : new Date('01/05/2020')
      },{
        'fonction': 'TECHNICIEN',
        'position': 1,
        'salaireBase' : 4000,
        'dateEmbauche' : new Date('01/05/2020')
      }]

      const employesHors = SalaireService.trouverSalairesHorsNormes(employes);
      assert.strictEqual(employesHors.length, 1);
      assert.strictEqual(employesHors[0].salaireBase, 4000);

      return done();
    });

    it('should return employe 2', function (done) {
      const employes = [{
        'fonction': 'TECHNICIEN',
        'position': 3,
        'salaireBase' : 1652,
        'dateEmbauche' : new Date('01/05/2020')
      },{
        'fonction': 'TECHNICIEN',
        'position': 1,
        'salaireBase' : 900,
        'dateEmbauche' : new Date('01/05/2020')
      }]

      const employesHors = SalaireService.trouverSalairesHorsNormes(employes);
      assert.strictEqual(employesHors.length, 1);
      assert.strictEqual(employesHors[0].salaireBase, 900);

      return done();
    });

  })

    describe('#calculerMoyenneSalaires()', function() {
    it('should return the correct moyennes', function (done) {
      const employes = [{
        'fonction': 'TECHNICIEN',
        'position': 3,
        'salaireBase' : 2000,
        'dateEmbauche' : new Date('01/05/2020')
      },{
        'fonction': 'TECHNICIEN',
        'position': 1,
        'salaireBase' : 4000,
        'dateEmbauche' : new Date('01/05/2020')
      },{
        'fonction': 'CADRE',
        'position': 3,
        'salaireBase' : 3000,
        'dateEmbauche' : new Date('01/05/2020')
      },{
        'fonction': 'CADRE',
        'position': 1,
        'salaireBase' : 4000,
        'dateEmbauche' : new Date('01/05/2020')
      }]
      const expectedMoyennes = {'TECHNICIEN': 3000, 'CADRE': 3500}

      const moyennes = SalaireService.calculerMoyenneSalaires(employes);
      assert.deepEqual(moyennes, expectedMoyennes);

      return done();
    });


  })
});
