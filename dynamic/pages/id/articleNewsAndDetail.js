import fetch from 'isomorphic-unfetch';
import { i18n } from '../../../i18n';
import isEmpty from 'lodash/isEmpty';

// Components
import LayoutMain from '@components/layout.LayoutMain';

// Containers
import ArticleAndNewsDetail from '@components/page.ArticleAndNewsDetail';

// Redux Actions
import { setFooterData } from '@redux/actions/footerActions';

// Config
import Config from '@config/api';

const ArticleNewsDetailPage = (props) => {
  const language = 'id';
  i18n.changeLanguage(language);

  return (
    <LayoutMain 
      activeNav='Artikel dan Berita'
      language={language}
      footerData={props.footerData}
    >
      <ArticleAndNewsDetail 
        {...props}
        language={language} 
      />
    </LayoutMain>
  );
};

export const getArticleAndNewsDetailInitialProps = async ({ query, store }) => {
  const env = process.env.NODE_ENV;
  const apiUrl = Config.apiUrl[env];
  
  const { footer } = store.getState();
  let footerData = footer.data;

  const { dynamic } = query;
  const pageType = dynamic[0];
  const id = dynamic[1];
  const title = dynamic[2];
  const res = await fetch(`${apiUrl}/article/${id}?language=id`);
  const { data } = await res.json();

  const commentRes = await fetch(`${apiUrl}/article/${id}/comment`);
  const { data: commentData } = await commentRes.json();

  const recentPosRes = await fetch(`${apiUrl}/article?language=id&pageNumber=1&pageSize=4`);
  const { data: recentPosData } = await recentPosRes.json();

  if (isEmpty(footerData)) {
    const footerRes = await fetch(`${apiUrl}/footer`);
    const { data } = await footerRes.json();
    await store.dispatch(setFooterData(data));
    
    footerData = data;
  }
  
  return {
    namespacesRequired: ['pages', 'articleAndNews'],
    articleId: id,
    articleTitle: title,
    content: data,
    commentData,
    recentPosData,
    footerData,
    pageType
  }
}

export default ArticleNewsDetailPage;
