import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';
import isEmpty from 'lodash/isEmpty';

// Components
import LayoutMain from '@components/layout.LayoutMain';

// Containers
import ArticleAndNews from '@components/page.ArticleAndNews';

// Redux Actions
import { setFooterData } from '@redux/actions/footerActions';

function ArticleAndNewsPage(props) {
  const language = 'en';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Article and News'
      language={language}
      footerData={props.footerData}
    >
      <Head>
        <title>Article And News</title>
        <meta name="Description" content="Article And News" />
      </Head>

      <ArticleAndNews 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

ArticleAndNewsPage.getInitialProps = async ({ store }) => {
  const { footer } = store.getState();
  let footerData = footer.data;

  const res = await fetch(`http://nonprod.dhealth.arinanda.com/api/v1/article?language=en&pageNumber=1&pageSize=9`);
  const { data: content } = await res.json();

  if (isEmpty(footerData)) {
    const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
    const { data } = await footerRes.json();
    await store.dispatch(setFooterData(data));
    
    footerData = data;
  }
  
  return {
    namespacesRequired: ['pages', 'articleAndNews'],
    content,
    footerData
  }
}

export default ArticleAndNewsPage;
