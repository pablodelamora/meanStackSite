/* GET para la pagina principal */
module.exports.homelist = function(req, res){
 res.render('locations-list', {
   title: 'buscaFut - Busca, Encuentra, Juega!',
    pageHeader: {
        title: 'buscaFut',
        strapline: 'Busca, Encuentra, Juega!'
    },
    locations: [{
     name: 'Anahuac Norte',
     address: '125 High Street, Reading, RG6 1PS',
     rating: 3,
     facilities: ['Hot drinks', 'Food', 'Premium wifi'],
     distance: '100m'
    },{
     name: 'Anahuac Sur',
     address: '125 High Street, Reading, RG6 1PS',
     rating: 4,
     facilities: ['Hot drinks', 'Food', 'Premium wifi'],
     distance: '200m'
    },{
     name: 'Tec CSF',
     address: '125 High Street, Reading, RG6 1PS',
     rating: 2,
     facilities: ['Food', 'Premium wifi'],
     distance: '250m'
    }]
  });
};

/* GET para detalles de un elemento */
module.exports.locationInfo = function(req, res) {
    res.render('location-info', {
        title: 'Starcups',
        pageHeader: {
            title: 'Starcups'
        },
        sidebar: {
            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
        },
        location: {
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            coords: {
                lat: 51.455041,
                lng: -0.9690884
            },
            openingTimes: [{
                days: 'Monday - Friday',
                opening: '7:00am',
                closing: '7:00pm',
                closed: false
            }, {
                days: 'Saturday',
                opening: '8:00am',
                closing: '5:00pm',
                closed: false
            }, {
                days: 'Sunday',
                closed: true
            }],
            reviews: [{
                author: 'Simon Holmes',
                rating: 5,
                timestamp: '16 July 2013',
                reviewText: 'What a great place. I can\'t say enough good things about it.'
            }, {
                author: 'Charlie Chaplin',
                rating: 3,
                timestamp: '16 June 2013',
                reviewText: 'It was okay1. Coffee wasn\'t great, but the wifi was fast.'
            }]
        }
    });
};


/* GET para poder agregar rese;as */
module.exports.addReview = function(req, res) {
    res.render('location-review-form', {
        title: 'Agrega Reseña',
        pageHeader: {
            title: 'Reseña'
        }
    });
};
