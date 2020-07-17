import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';
import isEmpty from 'lodash/isEmpty';

// Components
import LayoutMain from '@components/layout.LayoutMain';

// Containers
import FrontOffice from '@components/page.product.FrontOffice';

// Redux Actions
import { setFooterData } from '@redux/actions/footerActions';

function FrontOfficePage(props) {
  const language = 'en';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Product'
      activeNestedNav='product-front-office'
      language={language}
      footerData={props.footerData}
    >
      <Head>
        <title>Product - Front Office</title>
        <meta name="Description" content="Product - Front Office" />
      </Head>

      <FrontOffice 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

FrontOfficePage.getInitialProps = async ({ store }) => {
  const { footer } = store.getState();
  let footerData = footer.data;
  
  const res = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/products');
  const { data } = await res.json();
  const frontOfficeData = data[0];

  if (isEmpty(footerData)) {
    const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
    const { data } = await footerRes.json();
    await store.dispatch(setFooterData(data));
    
    footerData = data;
  }
  
  return {
    namespacesRequired: ['pages'],
    content: frontOfficeData,
    footerData
  }
}

export default FrontOfficePage;
