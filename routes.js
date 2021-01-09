const routes = require('next-routes')();

routes
  .add('/campaigns/new','/campaigns/new')
  .add('/campaigns/:address', '/campaigns/show')
  .add('/campaigns/:address/requests','/campaigns/requests/index');


//Priority matters in routes
module.exports = routes;
