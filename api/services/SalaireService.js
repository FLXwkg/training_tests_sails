const GRILLE_SALARIALE = {
  TECHNICIEN : {
    1 : 1250,
    2 : 1450,
    3 : 1720
  },
  CADRE : {
    1 : 1700,
    2 : 1850,
    3 : 1920,
    4 : 2200,
    5 : 2400,
  },
  CADRE_SUPERIEUR : {
    1 : 2550,
    2 : 2680,
    3 : 2870,
    4 : 3100,
    5 : 3600,
    6 : 4000
  }
}


module.exports = {

  /**
   * Le salaire de base d'un employé correspond au salaire hors primes
   * Il est définit pas son ancienneté
   * @param employe
   * @returns {number}
   */
  calculerSalaireBaseEmploye(employe){

    if (!GRILLE_SALARIALE[employe.fonction][employe.position]){
      employe.position = Math.max(...(Object.keys(GRILLE_SALARIALE[employe.fonction]).map(Number)));
    }

    // Salaire en fonction du poste et de la position de l'employe
    let salaire = GRILLE_SALARIALE[employe.fonction][employe.position];
    // Bonus de 15 % à partir de 10 ans d'experience
    if (employe.experience >= 10){
      salaire*=1.15;
    }
    // Bonus de 7 % à partir de 6 ans d'experience
    else if (employe.experience >= 6){
      salaire*=1.07;
    }
    // Bonus de 150€ pour tout employé qui a plus de 3 ans d'experience
    if (employe.experience >= 3){
      salaire+= 150;
    }
    return salaire;
  },

  /**
   * Le salaire d'un employé pour une période correspond au salaire avec les primes
   * @param employe
   * @param periode (format {annee : ... , mois : ...})
   * @param totalHeures nombre total d'heures effectuées
   * @returns {number}
   */
  calculerSalairePeriodeEmploye(employe , periode , totalHeures){
    let salaire = employe.salaireBase;

    let anciennete = nombreAnneesCompletes(employe.dateEmbauche , new Date(periode.annee , periode.mois , 1));
    
    // Ecrivez votre code ici
    salaire = salaire + (15 * anciennete); //45
    if (employe.fonction== 'TECHNICIEN' ){
      let heuresSup = Math.min(Math.max(totalHeures - 140 , 0) , 50)
      salaire = salaire + (heuresSup * 12) ;
    }
    return salaire;
  },

  /**
   * Salaires hors normes
   * @param employes
   * @returns {*[]}
   */
  trouverSalairesHorsNormes(employes){
    let salairesHorsNormes = [];
    // Ecrivez votre code ici

    return salairesHorsNormes;
  },

  /**
   * 
   * @param {*} employes Liste des employés 
   * @returns Moyennes par fonction
   */
  calculerMoyenneSalaires : (employes)=> {

  }
}

function nombreAnneesCompletes(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : Math.floor(months / 12);
}


