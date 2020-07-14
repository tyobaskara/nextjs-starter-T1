import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';

// Components
import LayoutMain from '@components/LayoutMain.layout';

// Containers
import FrontOffice from '@components/page.product.FrontOffice.component';

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
      </Head>

      <FrontOffice 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

FrontOfficePage.getInitialProps = async () => {
  const res = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/products');
  const { data } = await res.json();
  const frontOfficeData = data[0];

  const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
  const { data: footerData } = await footerRes.json();
  
  return {
    namespacesRequired: ['pages'],
    content: frontOfficeData,
    footerData
  }
}

export default FrontOfficePage;
