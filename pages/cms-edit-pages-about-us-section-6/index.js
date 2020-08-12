import { PureComponent } from 'react';
import axios from 'axios';
import Link from 'next/link';

// Layout
import LayoutMainCms from '@components/layout.LayoutMainCms';

// Container
import CmsEditTabsList from '@components/CmsEdit-TabsList.container';

// Component
import Loader from '@components/component.Loader';

// Constants
import Constants from '@constants/constants';

// Utils
import { getErrorMessage } from '@utils/fetch.utils';

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
    route: '/cms-edit-pages/about-us',
    name: 'About Us'
  },
  {
    route: '/cms-edit-pages-about-us-section-6',
    name: 'Section 6'
  }
];

const getProps = () => ({
  breadCrumbList,
  drawerActiveMenu: editPages
});

class CmsEditPagesAboutUsSection6Page extends PureComponent {
  state = {
    isLoading: true,
    isFetchTabListError: false,
    errorMessage: '',
    successMessage: '',
    tabsData: {},
    editTabsListRoute: []
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;
    this.fetchTabsData();
  }

  fetchTabsData = async () => {
    const apiUrl = Config.apiUrl[process.env.NODE_ENV];
    const url = `${apiUrl}/about-us?section=6`;

    try {
      const { data: response } = await axios.get(url);
      let tabsData = response.data;
      const editTabsListRoute = this.makeRouteList(tabsData);

      this.setState({ 
        isLoading: false, 
        tabsData,
        editTabsListRoute
      });
    } catch(error) {
      const errorMessage = getErrorMessage(error);
      this.setState({ isLoading: false, isFetchTabListError: true, errorMessage });
    }
  };

  makeRouteList = (tabsData) => {
    const apiUrl = Config.apiUrl[process.env.NODE_ENV];
    const res = tabsData.map((tab, index) => ({
      editTabRoute: `/cms-edit-pages-about-us-section-6-tab/${index}?tabId=${tab.id}`,
      editTabListRoute: `/cms-edit-pages-about-us-section-6-tab-list/${index}?tabId=${tab.id}`,
      name: `Tab - ${tab.technologyEn}`,
      itemId: tab.id,
      apiRemoveListUrl: `${apiUrl}/about-us/${tab.id}`
    }));

    return res;
  };

  _renderTabList = () => {
    const { isFetchTabListError, errorMessage } = this.state;

    if (isFetchTabListError) {
      return (
        <div className='form-error'>{errorMessage}</div>
      );
    }

    return (
      <CmsEditTabsList 
        {...getProps()}
        editTabsListRoute={this.state.editTabsListRoute}
        fetchTabsData={this.fetchTabsData}
      />
    )
  }

  render() {
    return (
      <LayoutMainCms>
        {this._renderTabList()}

        <div className='layout-cms'>
          <div className='cms-wrapper'>
            <div className='cms-container'>
              <Link href='/cms-edit-pages-about-us-section-6/create'>
                <button
                  className='btn btn-info mt-4'
                >Add New Tab</button>
              </Link>
            </div>
          </div>
        </div>

        {this.state.isLoading ? <Loader /> : null}
      </LayoutMainCms>
    );
  }
}

CmsEditPagesAboutUsSection6Page.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default CmsEditPagesAboutUsSection6Page;
