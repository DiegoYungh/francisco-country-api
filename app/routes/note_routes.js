const xss = require('xss');

module.exports = function(app, db){
  app.get('/search/', (request, response) => {
    response.send({
      error: 'You are not allowed to do an empty search'
    });
  });

  app.get('/search/:city', (request, response) => {
    let city = xss(request.params.city) || '';

    db.query("SELECT country, name FROM cities WHERE name LIKE ? LIMIT 100", ['%' + city + '%'], (error, results, fields) => {
      if(error){
        response.send({'error': error});
      }

      response.send(results);
    });
  });
}