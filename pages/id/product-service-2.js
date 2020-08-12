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

// Config
import Config from '@config/api';

function Service2Page(props) {
  const language = 'id';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Produk'
      activeNestedNav='product-service-2'
      language={language}
      footerData={props.footerData}
    >
      <Head>
        <title>Produk - Service 2</title>
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
  const env = process.env.NODE_ENV;
  const apiUrl = Config.apiUrl[env];

  const { footer } = store.getState();
  let footerData = footer.data;

  const res = await fetch(`${apiUrl}/products`);
  const { data: products } = await res.json();
  const service2Data = products[3];

  if (isEmpty(footerData)) {
    const footerRes = await fetch(`${apiUrl}/footer`);
    const { data } = await footerRes.json();
    await store.dispatch(setFooterData(data));
    
    footerData = data;
  }
  
  return {
    namespacesRequired: ['pages'],
    content: service2Data,
    products,
    footerData
  }
}

export default Service2Page;
