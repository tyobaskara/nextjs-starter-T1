/**
 * activeMenu should refer to constants cms.drawerMenu
 * /public/static/js/constants.js
 */

import { PureComponent, Fragment } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Cookies from 'js-cookie';

// Component
import BreadCrumb from '@components/BreadCrumb.component';
import Loader from '@components/Loader.component';

// Utils
import isEmpty from 'lodash/isEmpty';
import { getErrorMessage } from '@utils/fetch.utils';

export default class CmsEditProductListAction extends PureComponent {
  state = {
    isLoading: true,
    isFetchDataError: false,
    errorMessage: '',
    listData: [],
    isProductItem: false
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;
    this.fetchListData();
  }

  fetchListData = async () => {
    const { apiGetListUrl: url, productId } = this.props;

    try {
      const { data: { data } } = await axios({
        method: 'get',
        url
      });
      const productData = data.find(key => key.id == productId);
      const productTitle = productId ? productData.titleEn : '';
      const listData = this.selectListData(data);

      this.setState({ 
        isLoading: false, 
        listData,
        productTitle,
        isProductItem: !!productId
      });
    } catch(error) {
      const errorMessage = getErrorMessage(error);
      this.setState({ isLoading: false, isFetchDataError: true, errorMessage });
    }
  };

  selectListData = (data) => {
    const { productId } = this.props;

    // Product Item Data
    if (productId) {
      const productItem = data.find(key => key.id == productId);

      return productItem.items;
    }

    // Product Data
    return data;
  }

  _renderBreadCrumb = () => {
    const { breadCrumbList, productId } = this.props;
    const { isProductItem, productTitle } = this.state;

    if (isProductItem) {
      const list = [
        ...breadCrumbList,
        {
          route: `/cms-edit-product-item/list?productId=${productId}`,
          name: productTitle
        }
      ];
      Cookies.set('cmsProductItemBreadCrumb', JSON.stringify(list), { expires: 7 });

      return (
        <BreadCrumb data={list} />
      );
    }

    return (
      <BreadCrumb data={this.props.breadCrumbList} />
    );
  };

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
        {listData.map(item => this._renderListItem(item))}
      </ul>
    ) : null;
  };

  _renderListItem = (item) => {
    const { title } = this.props;
    const id = item.id;

    return (
      <li className='cmsList__item' key={id}>
        <p>{title}: {item.titleEn}</p>
        {this._renderListAction(id)}
      </li>
    );
  };

  _renderListAction = (id) => {
    const { routeType } = this.props;
    const { isProductItem } = this.state;
    
    if (isProductItem) {
      return this._renderBtnEditProductItem(id);
    }

    switch(routeType) {
      case 'productItemList':
        return this._renderBtnProductItem(id);
      default:
        return this._renderBtnEditProduct(id);
    }

  };

  _renderBtnEditProduct = (id) => {
    const { linkActionList } = this.props;

    return (
      <div className='cmsList__action'>
        <Link href={`${linkActionList}/${id}`}>
          <a className='btn btn-warning'>Edit</a>
        </Link>
      </div>
    );
  };

  _renderBtnProductItem = (id) => {
    const { linkActionList } = this.props;

    return (
      <div className='cmsList__action'>
        <Link href={`${linkActionList}?productId=${id}`}>
          <a className='btn btn-warning'>Edit Product Item</a>
        </Link>
      </div>
    );
  };

  _renderBtnEditProductItem = (id) => {
    const { linkActionList, productId } = this.props;

    return (
      <div className='cmsList__action'>
        <Link href={`${linkActionList}?productId=${productId}&itemId=${id}`}>
          <a className='btn btn-warning'>Edit Item</a>
        </Link>
      </div>
    );
  };

  _renderProductsList = () => {
    const { isFetchListError, errorMessage } = this.state;

    if (isFetchListError) {
      return (
        <div className='form-error'>{errorMessage}</div>
      );
    }

    return (
      <Fragment>
        {this._renderListContainer()}
      </Fragment>
    );
  };

  render() {
    return (
      <Fragment>
        {this._renderBreadCrumb()}
        {this._renderProductsList()}
        {this.state.isLoading ? <Loader /> : null}
      </Fragment>
    );
  }
}
