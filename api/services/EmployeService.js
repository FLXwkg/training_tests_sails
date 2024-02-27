module.exports = {

    embaucherEmploye : async (employe) => {
        // On calcule le salaire de base de l'employé
        employe.salaireBase = SalaireService.calculerSalaireBaseEmploye(employe);
        // Si l'employe est un technicien, on lui affecte une équpipe
        if (employe.fonction == "TECHNICIEN"){
            let equipe = EmployeService.affecterEquipe(employe);
            employe.equipe = equipe;
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
        // Do stuff ...
    }

}
