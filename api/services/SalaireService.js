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
    const grille = GRILLE_SALARIALE[employe.fonction];
    if (!grille) throw new Error(`La fonction n'existe pas : ${employe.fonction}`);

    const positions = Object.keys(grille).map(Number)
    const maxPOS = Math.max(...positions);
    if(employe.position > maxPOS){
        employe.position = maxPOS
    }
    // Salaire en fonction du poste et de la position de l'employe
    let salaire = grille[employe.position];
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
    const nbYear = getNumberYears(employe.dateEmbauche, periode)

    let salairePeriode = employe.salaireBase + (nbYear * 15);
    let heuresSup = 0

    if(employe.fonction === 'TECHNICIEN'){
      if(totalHeures > 140){
        heuresSup = totalHeures - 140;
        if(heuresSup > 50){
          heuresSup = 50;
        }
        if (heuresSup < 0){
          heuresSup = 0
        }
      }
    }
    salairePeriode += (heuresSup * 12)

    return salairePeriode;
  },

  /**
   * Salaires hors normes
   * @param employes
   * @returns {Object[]} employés dont le salaire est hors des ±20% de la grille
   */
  trouverSalairesHorsNormes(employes) {
    return employes.filter(employe => {
      const grille = GRILLE_SALARIALE[employe.fonction];
      if (!grille) return false;

      const salaireGrille = grille[employe.position];
      if (!salaireGrille) return false;

      const salaireMin = salaireGrille * 0.8;
      const salaireMax = salaireGrille * 1.2;

      return employe.salaireBase < salaireMin || employe.salaireBase > salaireMax;
    }).map(employe => ({
      ...employe,
      salaireGrille: GRILLE_SALARIALE[employe.fonction][employe.position]
    }));
  },

  /**
   * @param {*} employes
   * @returns
   */
  calculerMoyenneSalaires(employes) {
    const salairesParFonction = {};

    employes.forEach(e => {
      if (!salairesParFonction[e.fonction]) {
        salairesParFonction[e.fonction] = [];
      }
      salairesParFonction[e.fonction].push(e.salaireBase);
    });
    
    const moyennes = {};
    Object.entries(salairesParFonction).forEach(([fonction, salaires]) => {
      const total = salaires.reduce((acc, s) => acc + s, 0);
      moyennes[fonction] = total / salaires.length;
    });

    return moyennes;
  }
}

function getNumberYears(dateEmbauche, periode) {
  const periodeDate = new Date(periode.annee, periode.mois - 1, periode.jour || 1, 12, 0, 0);

  if (periodeDate < dateEmbauche) {
    throw new Error(`La période ${periodeDate.toISOString().slice(0, 10)} est antérieure à la date d'embauche ${dateEmbauche.toISOString().slice(0, 10)}`);
  }

  let nbYear = periodeDate.getFullYear() - dateEmbauche.getFullYear();

  if (
    periodeDate.getMonth() < dateEmbauche.getMonth() ||
    (periodeDate.getMonth() === dateEmbauche.getMonth() &&
      periodeDate.getDate() < dateEmbauche.getDate())
  ) {
    nbYear--;
  }

  return nbYear;
}

