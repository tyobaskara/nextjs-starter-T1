import fetch from 'isomorphic-unfetch';
import { i18n } from '../../i18n';
import isEmpty from 'lodash/isEmpty';

// Components
import LayoutMain from '@components/layout.LayoutMain';

// Containers
import ArticleAndNewsDetail from '@components/page.ArticleAndNewsDetail';

// Redux Actions
import { setFooterData } from '@redux/actions/footerActions';

function ArticleAndNewsDetailPage(props) {
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
}

ArticleAndNewsDetailPage.getInitialProps = async ({ query, store }) => {
  const { footer } = store.getState();
  let footerData = footer.data;

  const { id, title } = query;
  const res = await fetch(`http://nonprod.dhealth.arinanda.com/api/v1/article/${id}?language=id`);
  const { data } = await res.json();

  const commentRes = await fetch(`http://nonprod.dhealth.arinanda.com/api/v1/article/${id}/comment`);
  const { data: commentData } = await commentRes.json();

  const recentPosRes = await fetch(`http://nonprod.dhealth.arinanda.com/api/v1/article?language=id&pageNumber=1&pageSize=4`);
  const { data: recentPosData } = await recentPosRes.json();

  if (isEmpty(footerData)) {
    const footerRes = await fetch('http://nonprod.dhealth.arinanda.com/api/v1/footer');
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
    footerData
  }
}

export default ArticleAndNewsDetailPage;
