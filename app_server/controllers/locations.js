var request = require('request');

var apiOptions = {
 server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
 apiOptions.server = "https://protected-inlet-65821.herokuapp.com/";
}

var _isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var _formatDistance = function (distance) {
  var numDistance, unit;
  if (distance && _isNumeric(distance)) {
    if (distance > 1) {
      numDistance = parseFloat(distance).toFixed(1);
      unit = 'm';
    } else {
      numDistance = parseInt(distance / 10000000000,10);
      unit = 'm';
    }
    return numDistance + unit;
  } else {
    return "?";
  }
};

var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

var renderHomepage = function(req, res, responseBody){
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No places found nearby";
    }
  }
  res.render('locations-list', {
    title: 'buscaFut, Busca, Encuentra, Juega!',
    pageHeader: {
      title: 'buscaFut',
      strapline: 'Busca, Encuentra, Juega'
    },
    sidebar: "Esta página te ayuda a encontrar torneos de futbol cercanos a ti para que te puedas inscribir",
    locations: responseBody,
    message: message
  });
};



module.exports.doAddReview = function(req, res){
};




/* GET 'home' page */
module.exports.homelist = function(req, res){
  var requestOptions, path;
  path = '/api/locations';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {
      lng : -0.7992599,
      lat : 51.378091,
      maxDistance : 200000000000
    }
  };
  request(
    requestOptions,
    function(err, response, body) {
      var i, data;
      data = body;
      if (response.statusCode === 200 && data.length) {
        for (i=0; i<data.length; i++) {
          data[i].distance = _formatDistance(data[i].distance);
        }
      }
      renderHomepage(req, res, data);
    }
  );
};

var getLocationInfo = function (req, res, callback) {
  var requestOptions, path;
  path = "/api/locations/" + req.params.locationid;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var data = body;
      if (response.statusCode === 200) {
        data.coords = {
          //lng : body.coords[0],
          //lat : body.coords[1]
          lng: -0.9690884,
          lat: 51.455041
        };
        callback(req, res, data);
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

var renderDetailPage = function (req, res, locDetail) {
  res.render('location-info', {
    title: locDetail.name,
    pageHeader: {title: locDetail.name},
    sidebar: {
      context: 'Encuentra la liga que mas te acomode',
      callToAction: 'No te vas a arrepentir'
    },
    location: locDetail
  });
};

/* GET 'Location info' page */
module.exports.locationInfo = function(req, res){
  getLocationInfo(req, res, function(req, res, responseData) {
    renderDetailPage(req, res, responseData);
  });
};

var renderReviewForm = function (req, res, locDetail) {
  res.render('location-review-form', {
    title: 'Review ' + locDetail.name + ' en buscaFut',
    pageHeader: { title: 'Review ' + locDetail.name },
    error: req.query.err
  });
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res){
  getLocationInfo(req, res, function(req, res, responseData) {
    renderReviewForm(req, res, responseData);
  });
};

/* POST 'Add review' page */
module.exports.doAddReview = function(req, res){
  var requestOptions, path, locationid, postdata;
  locationid = req.params.locationid;
  path = "/api/locations/" + locationid + '/reviews';
  postdata = {
    author: req.body.name,
    rating: parseInt(req.body.rating, 10),
    reviewText: req.body.review
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
  if (!postdata.author || !postdata.rating || !postdata.reviewText) {
    res.redirect('/location/' + locationid + '/reviews/new?err=val');
  } else {
    request(
      requestOptions,
      function(err, response, body) {
        if (response.statusCode === 201) {
          res.redirect('/location/' + locationid);
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
          res.redirect('/location/' + locationid + '/reviews/new?err=val');
        } else {
          console.log(body);
          _showError(req, res, response.statusCode);
        }
      }
    );
  }
};
