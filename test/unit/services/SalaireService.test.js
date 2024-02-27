
const assert = require("assert");

describe('SalaireService', function() {
  
    describe('#calculerSalaireBaseEmploye()', function() {
    
        it('doit calculer le salaire de base d\'un technicien', function () {
            // 1 - Setup
            let employe = {
                experience : 5,
                fonction : "TECHNICIEN",
                position : 2
            };

            // 2 - Test
            let resulat = SalaireService.calculerSalaireBaseEmploye(employe)
            
            // 3 - Assertion
            assert.equal(resulat , 1600 , "Le salaire calculé n'est pas valide")
            
            // 4 - Cleanup
        });

        it('doit calculer le salaire de base d\'un cadre supérieur', function () {
            // 1 - Setup
            let employe = {
                experience : 8,
                fonction : "CADRE_SUPERIEUR",
                position : 5
            };

            // 2 - Test
            let resulat = SalaireService.calculerSalaireBaseEmploye(employe)
            
            // 3 - Assertion
            assert.equal(resulat , 4002 , "Le salaire calculé n'est pas valide")
            
            // 4 - Cleanup
        });

        
        it('doit calculer le salaire de base d\'un cadre supérieur', function () {
            // 1 - Setup
            let employe = {
                experience : 5,
                fonction : "TECHNICIEN",
                position : 5
            };

            // 2 - Test
            let resulat = SalaireService.calculerSalaireBaseEmploye(employe)
            
            // 3 - Assertion
            assert.equal(resulat , 1870 , "Le salaire calculé n'est pas valide")
            
            // 4 - Cleanup
        });
  });

  
  describe('#calculerSalairePeriodeEmploye()', function() {

    it('doit calculer le salaire de base d\'un technicien qui a effectué 15h suplémentaire', function () {
        // 1 - Setup
        let employe = {
            fonction : "TECHNICIEN",
            salaireBase : 1652,
            dateEmbauche : new Date(2020 , 4 , 5)
        };
        let periode = {mois : 0 , annee : 2024}

        // 2 - Test
        let resulat = SalaireService.calculerSalairePeriodeEmploye(employe , periode, 155)
        
        // 3 - Assertion
        assert.equal(resulat , 1877 )
        
        // 4 - Cleanup
    });
    
    it('doit calculer le salaire de base d\'un technicien qui a effectué 50h sup', function () {
        // 1 - Setup
        let employe = {
            fonction : "TECHNICIEN",
            salaireBase : 1652,
            dateEmbauche : new Date(2020 , 2 , 5)
        };

        let periode = {mois : 0 , annee : 2024}

        // 2 - Test
        let resulat = SalaireService.calculerSalairePeriodeEmploye(employe , periode, 190)
        
        // 3 - Assertion
        assert.equal(resulat , 2297)
        
        // 4 - Cleanup
    });

    it('doit calculer le salaire de base d\'un technicien qui a effectué 70h sup', function () {
        // 1 - Setup
        let employe = {
            fonction : "TECHNICIEN",
            salaireBase : 1652,
            dateEmbauche : new Date(2020 , 2 , 5)
        };

        let periode = {mois : 0 , annee : 2024}

        // 2 - Test
        let resulat = SalaireService.calculerSalairePeriodeEmploye(employe , periode, 220)
        
        // 3 - Assertion
        assert.equal(resulat , 2297)
        
        // 4 - Cleanup
    });


    it('doit calculer le salaire de base d\'un cadre qui a effectué 70h sup', function () {
        // 1 - Setup
        let employe = {
            fonction : "CADRE",
            salaireBase : 2562,
            dateEmbauche : new Date(2020 , 2 , 5)
        };

        let periode = {mois : 0 , annee : 2024}

        // 2 - Test
        let resulat = SalaireService.calculerSalairePeriodeEmploye(employe , periode, 220)
        
        // 3 - Assertion
        assert.equal(resulat , 2607)
        
        // 4 - Cleanup
    });

    it('doit calculer le salaire de base d\'un cadre qui a effectué 70h sup sans anciennete', function () {
        // 1 - Setup
        let employe = {
            fonction : "CADRE",
            salaireBase : 2562,
            dateEmbauche : new Date(2023 ,  1, 10)
        };

        let periode = {mois : 0 , annee : 2024}

        // 2 - Test
        let resulat = SalaireService.calculerSalairePeriodeEmploye(employe , periode, 220)
        
        // 3 - Assertion
        assert.equal(resulat , 2562)
        
        // 4 - Cleanup
    });
    
});


});