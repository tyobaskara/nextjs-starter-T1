import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';
import isEmpty from 'lodash/isEmpty';

// Components
import LayoutMain from '@components/layout.LayoutMain';

// Containers
import Testimonial from '@components/page.Testimonial';

// Redux Actions
import { setFooterData } from '@redux/actions/footerActions';

function TestimonialPage(props) {
  const language = 'id';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Testimonial'
      language={language}
      footerData={props.footerData}
    >
      <Head>
        <title>Testimonial</title>
        <meta name="Description" content="Testimonial" />
      </Head>

      <Testimonial 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

TestimonialPage.getInitialProps = async ({ store }) => {
  const { footer } = store.getState();
  let footerData = footer.data;

  const res = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/testimonial?pageNumber=1&pageSize=3');
  const { data } = await res.json();

  if (isEmpty(footerData)) {
    const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
    const { data } = await footerRes.json();
    await store.dispatch(setFooterData(data));
    
    footerData = data;
  }
  
  return {
    namespacesRequired: ['pages', 'testimonial'],
    content: data,
    footerData
  }
}

export default TestimonialPage;
