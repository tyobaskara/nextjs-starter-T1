import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';
import isEmpty from 'lodash/isEmpty';

// Components
import LayoutMain from '@components/layout.LayoutMain';

// Containers
import Information from '@components/page.product.Information';

// Redux Actions
import { setFooterData } from '@redux/actions/footerActions';

// Config
import Config from '@config/api';

function InformationPage(props) {
  const language = 'id';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Produk'
      activeNestedNav='product-information'
      language={language}
      footerData={props.footerData}
    >
      <Head>
        <title>Produk - Information</title>
        <meta name="Description" content="Product - Information" />
      </Head>

      <Information 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

InformationPage.getInitialProps = async ({ store }) => {
  const env = process.env.NODE_ENV;
  const apiUrl = Config.apiUrl[env];

  const { footer } = store.getState();
  let footerData = footer.data;

  const res = await fetch(`${apiUrl}/products`);
  const { data: products } = await res.json();
  const informationData = products[4];

  if (isEmpty(footerData)) {
    const footerRes = await fetch(`${apiUrl}/footer`);
    const { data } = await footerRes.json();
    await store.dispatch(setFooterData(data));
    
    footerData = data;
  }
  
  return {
    namespacesRequired: ['pages'],
    content: informationData,
    products,
    footerData
  }
}

export default InformationPage;
