const express = require('express');
const next = require('next');
const helmet = require("helmet");
const compression = require("compression");

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();
const port = dev ? 3000 : 80;

const routes = require("./routes");

app
  .prepare()
  .then(() => {
    const server = express();

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
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
