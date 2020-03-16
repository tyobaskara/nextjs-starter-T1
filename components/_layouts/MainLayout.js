import React from 'react';
import Header from '../_includes/Header';
import Footer from '../_includes/Footer';
import Head from 'next/head';

const MainLayout = props => (
  <>
    <Head>
      <title>App Title</title>
      <link rel="icon" href="/static/images/favicon.ico" />
      <link
        href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css'
        rel='stylesheet'
      />
      <link
        href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css'
        rel='stylesheet'
      />
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    </Head>
    <div className='mainLayout_container'>
      <Header />
      {props.children}
      <Footer />
    </div>
  </>
);

export default MainLayout;
