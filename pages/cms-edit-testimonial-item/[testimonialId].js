// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditTestimonialDetail from '@components/CmsEdit-Testimonial-Detail.container';

// Constants
import Constants from '@constants/constants';

// Config
import Config from '@config/api';

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
  const apiUrl = Config.apiUrl[process.env.NODE_ENV];
  const getProps = () => ({
    contentType: 'multipart/form-data',
    apiGetDataUrl: `${apiUrl}/testimonial`,
    apiUpdateUrl: `${apiUrl}/testimonial?id=[id]`,
    breadCrumbList,
    drawerActiveMenu: editPages,
    inputFileList: ['photo'],
    renameList: {
      quotationEn: 'QuoteEn',
      quotationId: 'QuoteId'
    }
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
