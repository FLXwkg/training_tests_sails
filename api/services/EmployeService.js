const EmployeDAO = require("../dao/EmployeDAO");
module.exports = {

    embaucherEmploye : async (employe, currentDate = new Date()) => {
        // On calcule le salaire de base de l'employé
        employe.salaireBase = SalaireService.calculerSalaireBaseEmploye(employe);
        // Si l'employe est un technicien, on lui affecte une équpipe
        if (employe.fonction == "TECHNICIEN"){
            let equipe = EmployeService.affecterEquipe(employe);
            employe.equipe = equipe;
        }

        if (employe.dateEmbauche){
            employe.dateEmbauche = new Date(employe.dateEmbauche)
            let periodesARegulariser = [];

            let curseur = employe.dateEmbauche;
            while( curseur.getMonth() <= currentDate.getMonth() ||
                    curseur.getFullYear() < currentDate.getFullYear()){
                curseur.setMonth(curseur.getMonth() + 1);
                let salaire = SalaireService.calculerSalairePeriodeEmploye(employe , {mois : curseur.getMonth() + 1 , annee : curseur.getFullYear()} , 140);

                periodesARegulariser.push({
                    annee : curseur.getFullYear(),
                    mois : curseur.getMonth(),
                    salaire : salaire
                })
            }

            EmployeService.regulariserSalairesEmploye(periodesARegulariser);
        }else{
            employe.dateEmbauche = currentDate
        }
        // Création de l'employé en BDD
        await EmployeDAO.creerEmploye(employe);
        return employe;
    },

    affecterEquipe(employe){
        return (Math.random() * 9) + 1;
    },

    preparerArriveEmploye(employe){
        // Do stuff ...
    },

    regulariserSalairesEmploye(employe , salaires){
        //
    },

    async supprimerEmploye(id){
        let employe = await EmployeDAO.findOne({id : id});
        if (employe.statut == 'EN_ACTIVITE'){
            throw new Error("Impossible de supprimer un employe en activite");
        }
        await EmployeDAO.destroyOne({id : id});
    },


}
