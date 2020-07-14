import Head from 'next/head';
// import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';

// Components
import LayoutMain from '@components/LayoutMain.layout';

// Containers
import ContactUs from '@components/page.ContactUs.component';

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
      </Head>

      <ContactUs 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

ContactUsPage.getInitialProps = async () => {
  const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
  const { data: footerData } = await footerRes.json();
  
  return {
    namespacesRequired: ['pages'],
    footerData
  }
}

export default ContactUsPage;
