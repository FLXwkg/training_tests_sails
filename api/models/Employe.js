/**
 * Employe.js
 *
 *
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    nom: {
      type: 'string',
      required: true,
      maxLength: 200,
    },
    prenom: {
      type: 'string',
      required: true,
      maxLength: 200,
    },
    fonction:{
      type : 'string',
      isIn : ["TECHNICIEN" , "CADRE" , "CADRE_SUPERIEUR"]
    },
    dateEmbauche: {
      type: 'string',
      required: true,
      columnType : 'date'
    },
    position: {
      type: 'number',
      required: true,
      min : 1,
      max : 6
    },
    experience: {
      type: 'number',
      required: true
    },
    salaireBase: {
      type: 'number',
      min : 0,
    },
    equipe: {
      type: 'string'
    },
    statut: {
      type: 'string',
      isIn : ['EN_ATTENTE' , 'EN_ACTIVITE' , 'LICENCIE' , 'DEMISSIONE']
    },
    numSecu : {
      type : 'string'
    }
  },


};
