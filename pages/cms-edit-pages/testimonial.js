// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

// Container
import CmsEditTestimonialList from '@components/CmsEdit-Testimonial-List.container';

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

function CmsEditPagesAboutUsSection2ItemPage() {
  const getProps = () => ({
    breadCrumbList,
    drawerActiveMenu: editPages,
    listTitle: 'Testimonial',
    apiGetListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/testimonial',
    apiRemoveListUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/testimonial?id=[id]',
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

CmsEditPagesAboutUsSection2ItemPage.getInitialProps = async () => ({
  namespacesRequired: ['common']
});

export default CmsEditPagesAboutUsSection2ItemPage;
