import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';
import isEmpty from 'lodash/isEmpty';

// Components
import LayoutMain from '@components/layout.LayoutMain';

// Containers
import ContactUs from '@components/page.ContactUs';

// Redux Actions
import { setFooterData } from '@redux/actions/footerActions';

function ContactUsPage(props) {
  const language = 'en';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Contact Us'
      language={language}
      footerData={props.footerData}
    >
      <Head>
        <title>Contact Us</title>
        <meta name="Description" content="Contact Us" />
      </Head>

      <ContactUs 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

ContactUsPage.getInitialProps = async ({ store }) => {
  const { footer } = store.getState();
  let footerData = footer.data;

  if (isEmpty(footerData)) {
    const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
    const { data } = await footerRes.json();
    await store.dispatch(setFooterData(data));
    
    footerData = data;
  }
  
  return {
    namespacesRequired: ['pages'],
    footerData
  }
}

export default ContactUsPage;
