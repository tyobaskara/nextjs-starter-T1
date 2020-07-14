import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';

// Components
import LayoutMain from '@components/LayoutMain.layout';

// Container
import About from '@components/page.About.component';

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
      </Head>

      <About 
        {...props}
        language={language}
      />
    </LayoutMain>
  );
}

AboutPage.getInitialProps = async () => {
  const res = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/about-us');
  const { data } = await res.json();

  const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
  const { data: footerData } = await footerRes.json();
  
  return {
    namespacesRequired: ['pages', 'visionmission', 'implementations'],
    content: data,
    footerData
  }
}
