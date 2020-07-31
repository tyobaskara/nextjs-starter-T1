/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent, Fragment } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Component
import BreadCrumb from '@components/component.BreadCrumb';
import Loader from '@components/component.Loader';

// Utils
import isEmpty from 'lodash/isEmpty';
import { getErrorMessage } from '@utils/fetch.utils';

export default class CmsEditArticleNewsListAction extends PureComponent {
  state = {
    isLoading: true,
    isFetchDataError: false,
    errorMessage: '',
    listData: [],
    pageNumber: 1,
    pageSize: 10,
    searchKey: ''
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;
    this.fetchListData();
  }

  fetchListData = async () => {
    const { pageNumber, pageSize, searchKey } = this.state;
    const { apiGetListUrl } = this.props;
    let url = apiGetListUrl.replace('[searchKey]', searchKey);
    url = url.replace('[pageNumber]', pageNumber);
    url = url.replace('[pageSize]', pageSize);

    try {
      const { data: response } = await axios({
        method: 'get',
        url
      });
      const listData = response.data;

      this.setState({ 
        isLoading: false, 
        listData,
        pageNumber: response.paging.pageNumber,
        totalPages: response.paging.totalPages
      });
    } catch(error) {
      const errorMessage = getErrorMessage(error);
      this.setState({ isLoading: false, isFetchDataError: true, errorMessage });
    }
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
    window.scrollTo(0, 0);
    
    this.setState({ 
      pageNumber, 
      isLoading: true 
    }, this.fetchListData);
  };

  _renderBreadCrumb = () => (
    <BreadCrumb data={this.props.breadCrumbList} />
  );

  _renderListContainer = () => {
    const { listData, isLoading } = this.state;

    if (isEmpty(listData) && !isLoading) {
      return (
        <div>
          <p>No Data Found</p>
        </div>
      );
    }

    return this._renderList();
  };

  _renderList = () => {
    const { listData, isLoading } = this.state;

    return !isLoading ? (
      <ul className="cmsList">
        {listData.map((item, index) => this._renderListItem(item, index))}
      </ul>
    ) : null;
  };

  _renderListItem = (item, index) => {
    const { id, label, name, createdAt, title, author } = item;

    return (
      <li className='cmsList__item' key={id}>
        <p><b>{label}</b></p>
        <p>{title}</p>
        <p>{name}</p>
        <p>{author}</p>
        <p>{createdAt}</p>
        {this._renderListAction(id)}
      </li>
    );
  };

  _renderListAction = (itemId) => {
    const { linkActionList } = this.props;
    
    return (
      <div className='cmsList__action'>
        <Link 
          href={`${linkActionList}/${itemId}`}
        >
          <a className='btn btn-warning'>Edit</a>
        </Link>

        <button 
          className='btn btn-danger' 
          onClick={this._showRemoveListConfirmModal(itemId)}
        >
          <span>Remove</span>
        </button>
      </div>
    );
  };

  _showRemoveListConfirmModal = itemId => () => {
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
        }, () => this.fetchRemoveList(itemId));
      }
    });
  };

  fetchRemoveList = async (itemId) => {
    const { apiRemoveListUrl } = this.props;
    const url = apiRemoveListUrl.replace('[id]', itemId);

    try {
      await axios.delete(url);

      this.setState({ isLoading: false }, this.fetchListData);
    } catch(error) {
      this.setState({ isLoading: false }, this._showErrorRemoveListModal);
    }
  };

  _showErrorRemoveListModal = () => {
    MySwal.fire(
      'Oops',
      'Something Went Wrong!',
      'error'
    );
  };

  _renderListAndButton = () => {
    const { isFetchListError, errorMessage } = this.state;

    if (isFetchListError) {
      return (
        <div className='form-error'>{errorMessage}</div>
      );
    }

    return (
      <Fragment>
        {this._renderListContainer()}
        {this._renderPagination()}
        {this._renderBtnAddList()}
      </Fragment>
    );
  };

  _renderBtnAddList = () => {
    const { linkActionList } = this.props;

    return (
    <Link 
      href={`${linkActionList}/create`}
    >
      <a className='btn btn-info my-3'>Add Article/News</a>
    </Link>
  )};

  _renderSearchForm = () => {
    return (
      <form
        className='mb-4'
        onSubmit={this._submitForm}
      >
        <div className='form-group'>
          <input 
            className='form-control' 
            placeholder='search' 
            type='text'
            onChange={event => this.onInputChange(event, 'searchKey')} 
            value={this.state.searchKey}
          />
        </div>
        <button type='submit' className='btn btn-primary'>Search</button>
      </form>
    );
  };

  _submitForm = (event) => {
    event.preventDefault();

    this.setState({
      isLoading: true,
      isError: false
    }, this.fetchListData)
  };

  onInputChange = (event, stateName) => {
    const { value } = event.target;

    this.setState({
      [stateName]: value,
      isError: false
    });
  };

  render() {
    return (
      <Fragment>
        {this._renderBreadCrumb()}
        {this._renderSearchForm()}
        {this._renderListAndButton()}
        {this.state.isLoading ? <Loader /> : null}
      </Fragment>
    );
  }
}
