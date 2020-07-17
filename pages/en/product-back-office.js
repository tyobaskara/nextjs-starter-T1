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

function BackOfficePage(props) {
  const language = 'en';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Product'
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
  const { footer } = store.getState();
  let footerData = footer.data;
  
  const res = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/products');
  const { data } = await res.json();
  const backOfficeData = data[1];

  if (isEmpty(footerData)) {
    const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
    const { data } = await footerRes.json();
    await store.dispatch(setFooterData(data));
    
    footerData = data;
  }
  
  return {
    namespacesRequired: ['pages'],
    content: backOfficeData,
    footerData
  }
}

export default BackOfficePage;
