/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

// Layout
import LayoutCms from '@components/layout.LayoutCms';

// Component
import CmsEditArticleNewsListAction from '@components/CmsEdit-ArticleNews-List-Action.component';

export default function CmsEditTestimonialList(props) {
  const _renderCmsEditTestimonialListAction = () => {
    const { token, apiGetListUrl, apiRemoveListUrl,
      breadCrumbList, linkActionList } = props;

    return (
      <CmsEditArticleNewsListAction 
        apiGetListUrl={apiGetListUrl}
        apiRemoveListUrl={apiRemoveListUrl}
        breadCrumbList={breadCrumbList}
        linkActionList={linkActionList}
        token={token}
      />
    );
  };

  return (
    <LayoutCms 
      {...props}
      activeMenu={props.drawerActiveMenu}
    >
      <div className='cms-wrapper'>
        <div className='cms-container'>
          {_renderCmsEditTestimonialListAction()}
        </div>
      </div>
    </LayoutCms>
  );
}
