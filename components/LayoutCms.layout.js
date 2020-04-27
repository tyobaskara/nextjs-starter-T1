import { PureComponent } from 'react';
import axios from 'axios';

// Constants
import Constants from '@constants/constants';

// Component
import Loader from '@components/Loader.component';
import MenuBtn from '@components/CmsDrawerMenuBtn.component';

const { 
  cms: {
    drawerMenu
  }
} = Constants;

export default class LayoutCms extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      token: ''
    }
  }

  componentDidMount() {
    this._setStateToken();
  }

  // need to setState because warning react will be appear if you directly use props.token validation to render component
  _setStateToken = () => {
    this.setState({
      token: this.props.token
    });
  };

  onLogout = () => {
    this.setState({ 
      isLoading: true
    }, this.fetchLogout);
  };

  fetchLogout = async () => {
    const { token } = this.state;
    const { toggleCmsDrawer , onLogOut } = this.props;

    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.post('http://nonprod.dhealth.arinanda.com/api/v1/users/logout');
      
      onLogOut();
      toggleCmsDrawer(false);
      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
    };
  };

  /**
   * cmsDrawer.isCmsDrawerOpen -> cmsDrawerReducer.js
   * toggleCmsDrawer -> cmsDrawerActions.js
   */
  toggleDrawer = () => {
    const { cmsDrawer: { isCmsDrawerOpen }, toggleCmsDrawer } = this.props;

    toggleCmsDrawer(!isCmsDrawerOpen);
  };

  _renderDrawerHeader = () => (
    <div className='cmsDrawer__header'>
      <button 
        className='cmsDrawer__hamburger'
        onClick={this.toggleDrawer}
      >
        <i className="fas fa-bars"></i>
      </button>
    </div>
  );

  _renderLogoutBtn = () => (
    <button className='cmsDrawer__btn cmsDrawer__btn--logout' onClick={this.onLogout}>
      <i className="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    </button>
  );

  _renderDrawer = () => (
    <div className='cmsDrawer'>
      {this._renderDrawerHeader()}
      {this._renderDrawerMenu()}
      {this._renderLogoutBtn()}
    </div>
  );

  _renderDrawerMenu = () => {
    return (
      <div className='cmsDrawerMenuWrapper'>
        <div className='cmsDrawerMenu'>
          {this._renderDrawerMenuItem()}
        </div>
      </div>
    )
  };

  _onMenuBtnClick = item => () => {
    const { router, toggleCmsDrawer } = this.props;
    const { route } = item;
    
    toggleCmsDrawer(false);
    router.push(route);
  };

  _renderDrawerMenuItem = () => drawerMenu.map(item => {
    const { name, iconClassName } = item;
    const { activeMenu } = this.props;
    const isActiveMenu = activeMenu === name;

    return (
      <MenuBtn 
        key={name}
        name={name}
        iconClassName={iconClassName}
        isActiveMenu={isActiveMenu}
        onMenuBtnClick={this._onMenuBtnClick(item)}
      />
    );
  });

  linkTo = route => () => {
    this.props.router.push(route);
  };

  _renderMobileHeader = () => (
    <div className='cmsHeaderMobile'>
      <button 
        className='cmsHeaderMobile__hamburger'
        onClick={this.toggleDrawer}
      >
        <i className="fas fa-bars"></i>
      </button>
    </div>
  );

  /**
   * cmsDrawer.isCmsDrawerOpen initialState -> cmsDrawerReducer.js
   */
  _renderLayout = () => {
    const { isLoading } = this.state;
    const { cmsDrawer: { isCmsDrawerOpen }, children } = this.props;
    const layoutClass = isCmsDrawerOpen
      ? 'layout-cms drawer-open' : 'layout-cms';

    return (
      <div className={layoutClass}>
        {this._renderMobileHeader()}
        {this._renderDrawer()}
        {children}
        {isLoading ? <Loader /> : null}
      </div>
    )
  };

  render() {
    return this.state.token ? this._renderLayout() : null;
  }
}
