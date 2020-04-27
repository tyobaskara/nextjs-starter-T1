const express = require('express');
const next = require('next');
const helmet = require("helmet");
const compression = require("compression");

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
