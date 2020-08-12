import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';
import isEmpty from 'lodash/isEmpty';

// Components
import LayoutMain from '@components/layout.LayoutMain';

// Container
import About from '@components/page.About';

// Redux Actions
import { setFooterData } from '@redux/actions/footerActions';

// Config
import Config from '@config/api';

export default function AboutPage(props) {
  const language = 'en';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='About Us'
      language={language}
      footerData={props.footerData}
    >
      <Head>
        <title>About Us</title>
        <meta name="Description" content="About Us" />
      </Head>

      <About 
        {...props}
        language={language}
      />
    </LayoutMain>
  );
}

AboutPage.getInitialProps = async ({ store }) => {
  const env = process.env.NODE_ENV;
  const apiUrl = Config.apiUrl[env];

  const { footer } = store.getState();
  let footerData = footer.data;

  const res = await fetch(`${apiUrl}/about-us`);
  const { data } = await res.json();

  if (isEmpty(footerData)) {
    const footerRes = await fetch(`${apiUrl}/footer`);
    const { data } = await footerRes.json();
    await store.dispatch(setFooterData(data));
    
    footerData = data;
  }
  
  return {
    namespacesRequired: ['pages', 'visionmission', 'implementations'],
    content: data,
    footerData
  }
}
