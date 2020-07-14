import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';

// Components
import LayoutMain from '@components/LayoutMain.layout';

// Containers
import Service2 from '@components/page.product.Service2.component';

function Service2Page(props) {
  const language = 'en';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Product'
      activeNestedNav='product-service-2'
      language={language}
      footerData={props.footerData}
    >
      <Head>
        <title>Product - Service 2</title>
      </Head>

      <Service2 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

Service2Page.getInitialProps = async () => {
  const res = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/products');
  const { data } = await res.json();
  const service2Data = data[3];

  const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
  const { data: footerData } = await footerRes.json();
  
  return {
    namespacesRequired: ['pages'],
    content: service2Data,
    footerData
  }
}

export default Service2Page;
