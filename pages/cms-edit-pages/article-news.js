// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditArticleNewsList from '@components/CmsEdit-ArticleNews-List.container';

// Constants
import Constants from '@constants/constants';

const {
  cms: {
    drawerActiveMenu: {
      editPages
    }
  }
} = Constants;

const breadCrumbList = [
  {
    route: '/cms/edit-pages',
    name: 'Edit Pages'
  },
  {
    route: '/cms-edit-pages/article-news',
    name: 'Article and News'
  }
];

function CmsEditArticleNewsPage() {
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    apiGetListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/article?language=en&searchKey=[searchKey]&pageNumber=[pageNumber]&pageSize=[pageSize]',
    apiRemoveListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/article/[id]',
    linkActionList:  '/cms-edit-article-news-item'
  });

  return (
    <LayoutMainCms>
      <CmsEditArticleNewsList 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditArticleNewsPage.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default CmsEditArticleNewsPage;
