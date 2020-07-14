import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';

// Components
import LayoutMain from '@components/LayoutMain.layout';

// Containers
import Information from '@components/page.product.Information.component';

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
      </Head>

      <Information 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

InformationPage.getInitialProps = async () => {
  const res = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/products');
  const { data } = await res.json();
  const informationData = data[4];
  
  const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
  const { data: footerData } = await footerRes.json();
  
  return {
    namespacesRequired: ['pages'],
    content: informationData,
    footerData
  }
}

export default InformationPage;
