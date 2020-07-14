import React, { PureComponent } from 'react';

export default class MessageList extends PureComponent {
  _renderFreeDemoList = () => {
    const { data = [] } = this.props;

    return data.length > 0 ? (
      <ul className='message-list'>
        {data.map((item, index) => this._renderFreeDemoListItem(item, index))}
      </ul>
    ) : null;
  };

  _renderFreeDemoListItem = (item, index) => {
    const { name, createdDate, message, 
      companyName, email, phone } = item;

    return (
      <li key={index}>
        <div className='message-list__item'>
          <div className='row'>
            <div className='col-lg-3'>
              <label>Date</label>
              <p className='message-list__item-date'>{createdDate}</p>
            </div>
            <div className='col-lg-2'>
              <label>Name</label>
              <p className='message-list__item-name'>{name}</p>
            </div>
            <div className='col-lg-2'>
              <label>Email</label>
              <p className='message-list__item-date'>{email}</p>
            </div>
            <div className='col-lg-2'>
              <label>Phone</label>
              <p className='message-list__item-date'>{phone}</p>
            </div>
            <div className='col-lg-3'>
              <label>Company Name</label>
              <p className='message-list__item-date'>{companyName}</p>
            </div>
          </div>

          <label>Message</label>
          <p className='message-list__item-msg'>{message}</p>
        </div>
      </li>
    );
  };

  render() {
    return this._renderFreeDemoList()
  }
}
