// Error Page
import ErrorPage from '../_error';

// Dynamic Pages
import ArticleNewsDetailPage, { getArticleAndNewsDetailInitialProps } from '@dynamicId/articleNewsAndDetail';

function DynamicPage(props) {
  const renderPage = () => {
    const { pageType } = props;

    switch (pageType) {
      case 'article':
      case 'news':
        return <ArticleNewsDetailPage {...props} />
      default:
        return <ErrorPage />;
    }
  };

  return renderPage();
}

const getInitialProps = async ({ query, store }) => {
  const { dynamic } = query;
  const pageType = dynamic[0];

  switch (pageType) {
    case 'article':
    case 'news':
      return getArticleAndNewsDetailInitialProps({ query, store });
    default:
      return {}
  }
}

DynamicPage.getInitialProps = (props) => getInitialProps(props);

export default DynamicPage;
