import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';

// Components
import LayoutMain from '@components/LayoutMain.layout';

// Containers
import BackOffice from '@components/page.product.BackOffice.component';

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
      </Head>

      <BackOffice 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

BackOfficePage.getInitialProps = async () => {
  const res = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/products');
  const { data } = await res.json();
  const backOfficeData = data[1];
  
  const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
  const { data: footerData } = await footerRes.json();
  
  return {
    namespacesRequired: ['pages'],
    content: backOfficeData,
    footerData
  }
}

export default BackOfficePage;
