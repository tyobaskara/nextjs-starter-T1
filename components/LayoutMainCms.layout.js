import { Fragment } from 'react';
import Head from 'next/head';

const LayoutMainCms = props => (
  <Fragment>
    <Head>
      <link rel="icon" href="/static/images/favicon.ico" />
      <link
        href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css'
        rel='stylesheet'
      />
      <link
        href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css'
        rel='stylesheet'
      />
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="robots" content="nofollow"/>
      <meta name="googlebot" content="noindex"/>
    </Head>

    {props.children}
  </Fragment>
);

export default LayoutMainCms;
