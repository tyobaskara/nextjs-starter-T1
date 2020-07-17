/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

// Layout
import LayoutCms from '@components/layout.LayoutCms';

// Component
import CmsEditTestimonialListAction from '@components/CmsEdit-Testimonial-List-Action.component';

export default function CmsEditTestimonialList(props) {
  const _renderCmsEditTestimonialListAction = () => {
    const { token, apiGetListUrl, apiRemoveListUrl,
      breadCrumbList, linkActionList, listTitle } = props;

    return (
      <CmsEditTestimonialListAction 
        listTitle={listTitle}
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
