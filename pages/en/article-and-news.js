import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';

// Components
import LayoutMain from '@components/LayoutMain.layout';

// Containers
import ArticleAndNews from '@components/page.ArticleAndNews.component';

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
      </Head>

      <ArticleAndNews 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

ArticleAndNewsPage.getInitialProps = async () => {
  const res = await fetch(`http://nonprod.dhealth.arinanda.com/api/v1/article?language=en&pageNumber=1&pageSize=9`);
  const { data: content } = await res.json();

  const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
  const { data: footerData } = await footerRes.json();
  
  return {
    namespacesRequired: ['pages', 'articleAndNews'],
    content,
    footerData
  }
}

export default ArticleAndNewsPage;
