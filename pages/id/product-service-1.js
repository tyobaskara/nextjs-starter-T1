import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';

// Components
import LayoutMain from '@components/LayoutMain.layout';

// Containers
import Service1 from '@components/page.product.Service1.component';

function Service1Page(props) {
  const language = 'id';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Produk'
      activeNestedNav='product-service-1'
      language={language}
      footerData={props.footerData}
    >
      <Head>
        <title>Produk - Service 1</title>
      </Head>

      <Service1 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

Service1Page.getInitialProps = async () => {
  const res = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/products');
  const { data } = await res.json();
  const service1Data = data[2];
  
  const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
  const { data: footerData } = await footerRes.json();
  
  return {
    namespacesRequired: ['pages'],
    content: service1Data,
    footerData
  }
}

export default Service1Page;
