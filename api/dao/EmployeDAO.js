module.exports = {

    creerEmploye : async (employe) => {
        for (let attribute in Employe.attributes){
            Employe.validate(attribute , employe[attribute]);
        }
        
        await Employe.create(employe);
        return employe;
    },

}