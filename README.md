# D'health Web Development

Frontend Development and CMS using Next.js Framework

## Redux

> Redux Setup:

- /dhealth-culturo/redux/actions/cmsDrawerActions.js
- /dhealth-culturo/redux/reducers/cmsDrawerReducer.js
- /dhealth-culturo/redux/reducers/rootReducer.js
- /dhealth-culturo/redux/store.js
- /dhealth-culturo/pages/_app.js

### Pages Using Redux:

> CMS Dashboard Layout for Drawer Hamburger to Toggle On/Off onClick Event (connect Redux on withToken HOC)

- /dhealth-culturo/hoc/WithToken.js
- /dhealth-culturo/containers/cmsDashboard/cmsDashboard.container.js
- /dhealth-culturo/containers/cmsDashboard/cmsDashboard.component.js
- /dhealth-culturo/components/_layouts/cms.layout.js

### Redux Dependency

- "react-redux": "^7.2.0",
- "redux": "^4.0.5",
- "redux-thunk": "^2.3.0",
- "next-redux-wrapper": "^5.0.0",
- "recompose": "^0.30.0"
