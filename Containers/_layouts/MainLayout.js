import Head from 'next/head';

// Components
import Header from '../../Components/_includes/Header';
import Footer from '../../Components/_includes/Footer';

const MainLayout = props => (
  <>
    <div className='mainLayout_container'>
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
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>

      <Header />
      {props.children}
      <Footer />
    </div>
  </>
);

export default MainLayout;
