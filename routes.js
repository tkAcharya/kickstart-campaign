const routes = require('next-routes')();

routes
  .add('/campaigns/new','/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show');


//Priority matters in routes
module.exports = routes;
