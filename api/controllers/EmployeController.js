module.exports = {

  liste : async (req , res) => {
    let employes = await Employe.find();
    res.view('pages/employe/liste' , {employes : employes});
  },

  embaucher : async (req , res) => {
    await EmployeService.embaucherEmploye(req.body);
    res.redirect("/employe/liste");
  },

  supprimer : async (req , res) => {
    await Employe.destroyOne({id : req.params.id});
    res.redirect("/employe/liste");
  }
}
