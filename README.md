# D'health Web Development

Frontend Development and CMS using Next.js Framework,
Every Frontend Development starts from ./pages folder.

## Run Local Development

> $ Npm install
> $ Yarn dev
> or
> $ npm run dev

## Redux

> Redux Setup:

- /redux/actions/*.js
- /redux/reducers/*.js
- /redux/store.js
- /pages/_app.js

### Pages Using Redux

> CMS Dashboard Layout for Drawer Hamburger to Toggle On/Off onClick Event (connect Redux on withToken HOC)

- /hoc/WithToken.js
- /containers/cmsDashboard/cmsDashboard.container.js
- /containers/cmsDashboard/cmsDashboard.component.js
- /components/_layouts/cms.layout.js

### Redux Dependency

- "react-redux": "^7.2.0",
- "redux": "^4.0.5",
- "redux-thunk": "^2.3.0",
- "next-redux-wrapper": "^5.0.0",
- "recompose": "^0.30.0"
