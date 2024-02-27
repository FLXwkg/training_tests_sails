/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'GET /employe/liste' : 'EmployeController.liste',
  'GET /employe/embaucher' : { view: 'pages/employe/embaucher' },
  'POST /employe/embaucher' : 'EmployeController.embaucher',
  'GET /employe/:id/supprimer' : 'EmployeController.supprimer',

};
