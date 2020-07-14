// Layout
import LayoutMainCms from '@components/LayoutMainCms.layout';

// Container
import CmsEditTestimonialDetail from '@components/CmsEdit-Testimonial-Detail.container';

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

function CmsEditTestimonialItemDetailPage() {
  const getProps = () => ({
    contentType: 'multipart/form-data',
    apiGetDataUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/testimonial',
    apiUpdateUrl: 'http://nonprod.dhealth.arinanda.com/api/v1/testimonial?id=[id]',
    breadCrumbList,
    drawerActiveMenu: editPages,
    inputFileList: ['photo']
  });

  return (
    <LayoutMainCms>
      <CmsEditTestimonialDetail 
        {...getProps()}
      />
    </LayoutMainCms>
  );
}

CmsEditTestimonialItemDetailPage.getInitialProps = async () => ({
    namespacesRequired: ['common']
  });

export default CmsEditTestimonialItemDetailPage;
