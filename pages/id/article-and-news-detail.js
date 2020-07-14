import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';

// Components
import LayoutMain from '@components/LayoutMain.layout';

// Containers
import ArticleAndNewsDetail from '@components/page.ArticleAndNewsDetail.component';

function ArticleAndNewsDetailPage(props) {
  const { articleId, articleTitle } = props;
  const language = 'id';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Artikel dan Berita'
      language={language}
      footerData={props.footerData}
    >
      <Head>
        <title>Artikel dan Berita</title>
      </Head>

      <ArticleAndNewsDetail 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
}

ArticleAndNewsDetailPage.getInitialProps = async ({ query }) => {
  const { id, title } = query;
  const res = await fetch(`http://nonprod.dhealth.arinanda.com/api/v1/article/${id}?language=id`);
  const { data } = await res.json();

  const commentRes = await fetch(`http://nonprod.dhealth.arinanda.com/api/v1/article/${id}/comment`);
  const { data: commentData } = await commentRes.json();

  const recentPosRes = await fetch(`http://nonprod.dhealth.arinanda.com/api/v1/article?language=en&pageNumber=1&pageSize=4`);
  const { data: recentPosData } = await recentPosRes.json();

  const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
  const { data: footerData } = await footerRes.json();
  
  return {
    namespacesRequired: ['pages', 'articleAndNews'],
    articleId: id,
    articleTitle: title,
    content: data,
    commentData,
    recentPosData,
    footerData
  }
}

export default ArticleAndNewsDetailPage;
