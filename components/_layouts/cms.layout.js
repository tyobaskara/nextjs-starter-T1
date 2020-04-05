import { PureComponent } from 'react';
import axios from 'axios';

// Component
import Loader from '../../components/loader/loader.component';

export default class CmsDashboard extends PureComponent {
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
          {this._renderUserMenu()}
        </div>
      </div>
    )
  };

  _renderUserMenu = () => (
    <div className='menuSetting'>
      <button className='cmsDrawer__btn'>
        <i className="fas fa-users"></i>
        <span>User Setting</span>
      </button>
    </div>
  );

  _renderMobileHeader = () => (
    <div className='cmsHeaderMobile'>
      <button 
        className='cmsHeaderMobile__hamburger'
        onClick={this.toggleDrawer}
      >
        <i className="fas fa-bars"></i>
      </button>
    </div>
  )

  /**
   * cmsDrawer.isCmsDrawerOpen initialState -> cmsDrawerReducer.js
   */
  _renderLayout = () => {
    const { isLoading } = this.state;
    const { cmsDrawer: { isCmsDrawerOpen }, children } = this.props;
    const layoutClass = isCmsDrawerOpen
      ? 'layout-dashboard drawer-open' : 'layout-dashboard';

    return (
      <div className={layoutClass}>
        {this._renderMobileHeader()}
        {this._renderDrawer()}
        {children}
        {isLoading ? <Loader /> : null}
      </div>
    )
  }

  render() {
    return this.state.token ? this._renderLayout() : null;
  }
}
