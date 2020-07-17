import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';
import isEmpty from 'lodash/isEmpty';

// Components
import LayoutMain from '@components/layout.LayoutMain';

// Containers
import Service1 from '@components/page.product.Service1';

// Redux Actions
import { setFooterData } from '@redux/actions/footerActions';

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
        <meta name="Description" content="Product - Service 1" />
      </Head>

      <Service1 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

Service1Page.getInitialProps = async ({ store }) => {
  const { footer } = store.getState();
  let footerData = footer.data;

  const res = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/products');
  const { data } = await res.json();
  const service1Data = data[2];

  if (isEmpty(footerData)) {
    const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
    const { data } = await footerRes.json();
    await store.dispatch(setFooterData(data));
    
    footerData = data;
  }
  
  return {
    namespacesRequired: ['pages'],
    content: service1Data,
    footerData
  }
}

export default Service1Page;
