import Head from 'next/head';

// Components
import Header from '@components/includes.component.Header';
import Footer from '@components/includes.component.Footer';

const LayoutMain = props => (
  <>
    <div className='mainLayout_container'>
      <Head>
        <link rel="icon" href="/static/images/favicon.ico" />
        <link href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css' rel='stylesheet' />
        <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css' rel='stylesheet' />
        <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header 
        activeNav={props.activeNav}
        activeNestedNav={props.activeNestedNav}
        language={props.language}
      />
      {props.children}
      <Footer
        language={props.language}
        footerData={props.footerData}
      />
    </div>
  </>
);

export default LayoutMain;
