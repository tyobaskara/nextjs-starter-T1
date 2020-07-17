import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';
import isEmpty from 'lodash/isEmpty';

// Components
import LayoutMain from '@components/layout.LayoutMain';

// Containers
import Service2 from '@components/page.product.Service2';

// Redux Actions
import { setFooterData } from '@redux/actions/footerActions';

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
        <meta name="Description" content="Product - Service 2" />
      </Head>

      <Service2 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

Service2Page.getInitialProps = async ({ store }) => {
  const { footer } = store.getState();
  let footerData = footer.data;
  
  const res = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/products');
  const { data } = await res.json();
  const service2Data = data[3];

  if (isEmpty(footerData)) {
    const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
    const { data } = await footerRes.json();
    await store.dispatch(setFooterData(data));
    
    footerData = data;
  }
  
  return {
    namespacesRequired: ['pages'],
    content: service2Data,
    footerData
  }
}

export default Service2Page;
