const express = require('express');
const next = require('next');
const helmet = require("helmet");
const compression = require("compression");
// const cors = require('cors');

// const { createProxyMiddleware } = require('http-proxy-middleware');
// const devProxy = {
//   '/api': {
//     target: 'http://localhost:3000', 
//     pathRewrite: {
//         '^/api': '/api'
//     },
//     changeOrigin: true
//   }
// };

const nextI18NextMiddleware = require('next-i18next/middleware').default;
const nextI18next = require('../i18n');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();
const port = dev ? 3000 : 80;

const routes = require("./routes");

(async () => {
  await app.prepare();
  const server = express();

  await nextI18next.initPromise;
  server.use(nextI18NextMiddleware(nextI18next));

  // server.use(cors());
  // server.options('*', cors());

  // server.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });
  
  // if (dev && devProxy) {
  //   Object.keys(devProxy).forEach(function(context) {
  //       server.use(createProxyMiddleware (context, devProxy[context]))
  //   })
  // }

  if (!dev) {
    /* Helmet helps secure our app by setting various HTTP headers */
    server.use(helmet());
    /* Compression gives us gzip compression */
    server.use(compression());
  }

  /* Body Parser built-in to Express as of version 4.16 */
  server.use(express.json());

  /* apply routes from the "routes" folder */
  server.use("/", routes);

  /* Error handling from async / await functions */
  server.use((err, req, res, next) => {
    const { status = 500, message } = err;
    res.status(status).json(message);
  });

  server.all('*', (req, res) => {
    handle(req, res);
  });

  const PORT = process.env.PORT || port;

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> ready on port ${PORT}`);
  });
})();
