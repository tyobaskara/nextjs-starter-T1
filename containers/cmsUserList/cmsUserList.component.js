/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent, Fragment } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// layout
import CmsLayout from '../../components/_layouts/cms.layout';

// Component
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb.component';
import Loader from '../../components/Loader/Loader.component';
import CustomModal from '../../components/CustomModal/CustomModal.component';

// Utils
import { getErrorMessage } from '../../utils/fetch.utils';

import Constants from '../../constants/constants';

const {
  cms: {
    drawerActiveMenu: {
      userSetting
    }
  }
} = Constants;

const breadCrumbList = [
  {
    route: '/cms/user-setting',
    name: 'User Setting'
  },
  {
    route: '/cms/user-setting/user-list',
    name: 'User List'
  }
];

export default class CmsUserList extends PureComponent {
  state = {
    isLoading: true,
    isFetchUserListError: false,
    userListData: [],
    pageNumber: 1,
    totalPages: 1,
    inputResetPassword: '',
    isResetPasswordModal: false,
    userId: -1,
    isResetPasswordError: false,
    errorMessage: ''
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;
    this.fetchUserList();
  }

  fetchUserList = async () => {
    const { pageNumber } = this.state;
    const url = `http://nonprod.dhealth.arinanda.com/api/v1/users?pageNumber=${pageNumber}`;

    try {
      const { data: response } = await axios.get(url);
      const userListData = response.data;
      const paging = response.paging;

      this.setState({ 
        isLoading: false, 
        userListData, 
        pageNumber: paging.pageNumber,
        totalPages: paging.totalPages
      });
    } catch(error) {
      const errorMessage = getErrorMessage(error);
      this.setState({ isLoading: false, isFetchUserListError: true, errorMessage });
    }
  };

  _renderBreadCrumb = () => (
    <BreadCrumb data={breadCrumbList} />
  );

  _renderUserList = () => (
    <ul className='cmsUserList'>
      {this.state.userListData.map(user => (
        <li key={user.email} className='cmsUserList-item'>
          <p>Email: {user.email}</p>
          {this._renderUserListAction(user.id)}
        </li>
      ))}
    </ul>
  );

  _renderUserListAction = (userId) => (
    <div className='cmsUserList-action'>
      <button 
        className='btn btn-warning'
        onClick={this._showResetPasswordUserModal(userId)}
      >
        <span>Reset Password</span>
      </button>

      <button 
        className='btn btn-danger' 
        onClick={this._showRemoveUserConfirmModal(userId)}
      >
        <span>Remove</span>
      </button>
    </div>
  )

  _showResetPasswordUserModal = (userId) => () => {
    this.setState({
      isResetPasswordModal: true,
      userId
    });
  };

  _closeResetPasswordUserModal = () => {
    this.setState({
      isResetPasswordModal: false,
      userId: '',
      inputResetPassword: ''
    });
  };

  _renderResetPasswordUserModal = () => (
    <CustomModal 
      customClass='cmsResetPasswordModal'
      isShow={this.state.isResetPasswordModal} 
      closeModal={this._closeResetPasswordUserModal}
    >
      {this._renderFormResetPassword()}
    </CustomModal>
  );

  onSubmitFormResetPassword = (event) => {
    event.preventDefault();

    this.setState({ isLoading: true }, this.fetchResetPassword);
  };

  fetchResetPassword = async () => {
    const { userId, inputResetPassword } = this.state;
    const url = `http://nonprod.dhealth.arinanda.com/api/v1/users/${userId}/_reset-password`;

    try {
      await axios.put(url, {
        defaultPassword: inputResetPassword
      });

      this.setState({ isLoading: false, isResetPasswordModal: false, inputResetPassword: '' });
    } catch(error) {
      const errorMessage = getErrorMessage(error);

      this.setState({ isLoading: false, isResetPasswordError: true, errorMessage });
    }
  }

  _renderFormResetPassword = () => (
    <form onSubmit={this.onSubmitFormResetPassword} className='formResetPassword'>
      <p className='formResetPassword-title'>Reset Password</p>

      <div className='form-group'>
        <label htmlFor='inputResetPassword'>Password</label>
        <input 
          id='inputResetPassword'
          className="form-control" 
          value={this.state.inputResetPassword} 
          onChange={event => this.onInputChange(event, 'inputResetPassword')} 
          required
        />
      </div>

      {this._renderResetPasswordErrorMessage()}

      <div className='formResetPassword-action'>
        <button type="submit" className="btn btn-primary">Reset</button>
        <button 
          className="btn btn-danger" 
          onClick={this._closeResetPasswordUserModal}
        >
          <span>Cancel</span>
        </button>
      </div>
    </form>
  );

  _renderResetPasswordErrorMessage = () => this.state.isResetPasswordError ? (
    <div className="form-group">
      <span className='form-error'>{this.state.errorMessage}</span>
    </div>
  ) : null;

  onInputChange = (event, stateName) => {
    const { value } = event.target;

    this.setState({
      [stateName]: value,
      isResetPasswordError: false
    });
  };

  _showRemoveUserConfirmModal = userId => () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.value) {
        this.setState({
          isLoading: true
        }, () => this.fetchRemoveUser(userId));
      }
    });
  };

  fetchRemoveUser = async (userId) => {
    const url = `http://nonprod.dhealth.arinanda.com/api/v1/users/${userId}`;

    try {
      await axios.delete(url);

      this.setState({ isLoading: false }, this.fetchUserList);
    } catch(error) {
      this.setState({ isLoading: false }, this._showErrorRemoveUserModal);
    }
  };

  _showErrorRemoveUserModal = () => {
    MySwal.fire(
      'Oops',
      'Something Went Wrong!',
      'error'
    );
  };

  _renderPagination = () => (
    <nav>
      <ul className="pagination">
        {this._renderPaginationItem()}
      </ul>
    </nav>
  );

  _renderPaginationItem = () => {
    const { pageNumber, totalPages } = this.state;
    let numbers = [];
    
    for (let i = 1; i <= totalPages; i++) {
      const page = {
        value: i,
        isActive: i === pageNumber
      };

      numbers.push(page);
    };

    return numbers.map(item => {
      const pageItemClass = item.isActive ? 'page-item active' : 'page-item';

      return (
        <li key={item.value} className={pageItemClass}>
          <button 
            className="page-link" 
            onClick={this.onPaginationClick(item.value)}>
            {item.value}
          </button>
        </li>
      );
    });
  };

  onPaginationClick = pageNumber => () => {
    this.setState({ pageNumber, isLoading: true }, this.fetchUserList);
  };

  _renderUserListAndPagination = () => {
    const { isFetchUserListError, errorMessage } = this.state;

    if (isFetchUserListError) {
      return (
        <div className='form-error'>{errorMessage}</div>
      );
    }

    return (
      <Fragment>
        {this._renderUserList()}
        {this._renderPagination()}
      </Fragment>
    );
  };

  render() {
    return (
      <CmsLayout 
        {...this.props}
        activeMenu={userSetting}
      >
        <div className='cms-wrapper'>
          <div className='cms-container'>
            {this._renderBreadCrumb()}
            {this._renderUserListAndPagination()}
            {this.state.isResetPasswordModal ? this._renderResetPasswordUserModal() : null}
            {this.state.isLoading ? <Loader /> : null}
          </div>
        </div>
      </CmsLayout>
    )
  }
}
