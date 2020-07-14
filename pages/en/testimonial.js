import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';

// Components
import LayoutMain from '@components/LayoutMain.layout';

// Containers
import Testimonial from '@components/page.Testimonial.component';

function TestimonialPage(props) {
  const language = 'en';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Testimonial'
      language={language}
      footerData={props.footerData}
    >
      <Head>
        <title>Testimonial</title>
      </Head>

      <Testimonial 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

TestimonialPage.getInitialProps = async () => {
  const res = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/testimonial?pageNumber=1&pageSize=3');
  const { data } = await res.json();

  const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
  const { data: footerData } = await footerRes.json();
  
  return {
    namespacesRequired: ['pages', 'testimonial'],
    content: data,
    footerData
  }
}

export default TestimonialPage;
