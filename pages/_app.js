import App from 'next/app';
import {Provider} from 'react-redux';
import withRedux from 'next-redux-wrapper';
import store from '~/redux/store';
import { appWithTranslation } from '~/i18n';

import '~/public/static/css/styles.scss';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps 
      ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <Component {...pageProps}/>
      </Provider>
    );
  }
}

//makeStore function that returns a new store for every request
const makeStore = () => store;

//withRedux wrapper that passes the store to the App Component
// export default withRedux(makeStore)(MyApp);
export default withRedux(makeStore)(appWithTranslation(MyApp));
