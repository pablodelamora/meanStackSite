/* GET para la pagina principal */
module.exports.homelist = function(req, res){
 res.render('locations-list', { title: 'Casa' });
};
/* GET para detalles de un elemento */
module.exports.locationInfo = function(req, res){
 res.render('location-info', { title: 'Información del Lugar' });
};

/* GET para agregar un review */
module.exports.addReview = function(req, res){
 res.render('location-review-form', { title: 'Agregar reseña' });
};
