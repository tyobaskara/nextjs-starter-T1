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

export default function AboutPage(props) {
  const language = 'id';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Tentang Kami'
      language={language}
      footerData={props.footerData}
    >
      <Head>
        <title>Tentang Kami</title>
        <meta name="Description" content="Tentang Kami" />
      </Head>

      <About 
        {...props}
        language={language}
      />
    </LayoutMain>
  );
}

AboutPage.getInitialProps = async ({ store }) => {
  const { footer } = store.getState();
  let footerData = footer.data;

  const res = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/about-us');
  const { data } = await res.json();

  if (isEmpty(footerData)) {
    const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
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
