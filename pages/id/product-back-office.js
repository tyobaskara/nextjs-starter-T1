import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';
import isEmpty from 'lodash/isEmpty';

// Components
import LayoutMain from '@components/layout.LayoutMain';

// Containers
import BackOffice from '@components/page.product.BackOffice';

// Redux Actions
import { setFooterData } from '@redux/actions/footerActions';

// Config
import Config from '@config/api';

function BackOfficePage(props) {
  const language = 'id';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Produk'
      activeNestedNav='product-back-office'
      language={language}
      footerData={props.footerData}
    >
      <Head>
        <title>Product - Back Office</title>
        <meta name="Description" content="Product - Back Office" />
      </Head>

      <BackOffice 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

BackOfficePage.getInitialProps = async ({ store }) => {
  const env = process.env.NODE_ENV;
  const apiUrl = Config.apiUrl[env];

  const { footer } = store.getState();
  let footerData = footer.data;

  const res = await fetch(`${apiUrl}/products`);
  const { data: products } = await res.json();
  const backOfficeData = products[1];

  if (isEmpty(footerData)) {
    const footerRes = await fetch(`${apiUrl}/footer`);
    const { data } = await footerRes.json();
    await store.dispatch(setFooterData(data));
    
    footerData = data;
  }
  
  return {
    namespacesRequired: ['pages'],
    content: backOfficeData,
    products,
    footerData
  }
}

export default BackOfficePage;
