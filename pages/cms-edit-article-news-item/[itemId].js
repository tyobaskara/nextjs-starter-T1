// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditArticleNewsDetail from '@components/CmsEdit-ArticleNews-Detail.container';

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

function CmsEditArticleNewsItemPage() {
  const getProps = () => ({
    contentType: 'multipart/form-data',
    apiGetDataUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/article/[itemId]?language=[lang]',
    apiUpdateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/article?id=[itemId]',
    breadCrumbList,
    drawerActiveMenu: editPages,
    inputFileList: ['image'],
    editorList: ['bodyEn', 'bodyId'],
    selectOptionList: [{
      selectKey: 'label',
      options: ['NEWS', 'ARTICLE']
    }]
  });

  return (
    <LayoutMainCms>
      <CmsEditArticleNewsDetail 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditArticleNewsItemPage.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditArticleNewsItemPage;
