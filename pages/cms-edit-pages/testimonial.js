// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditTestimonialList from '@components/CmsEdit-Testimonial-List.container';

// Config
import Config from '@config/api';

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
    route: '/cms-edit-pages/testimonial',
    name: 'Testimonial'
  }
];

function CmsEditPagesTestimonialPage() {
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    listTitle: 'Testimonial',
    apiGetListUrl: `${apiUrl}/testimonial`,
    apiRemoveListUrl: `${apiUrl}/testimonial/[id]`,
    linkActionList:  '/cms-edit-testimonial-item'
  });

  return (
    <LayoutMainCms>
      <CmsEditTestimonialList 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditPagesTestimonialPage.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default CmsEditPagesTestimonialPage;
