import { PureComponent } from 'react';

export class CustomModal extends PureComponent {
  _renderModal = () => {
    const { customClass = '' } = this.props;
    const wrapperClass = customClass ? `customModal ${customClass}` : 'customModal';

    return (
      <div className={wrapperClass}>
        <div 
          className='customModal-overlay' 
          onClick={this.props.closeModal}
        />
        <div className='customModal-wrapper'>
          {this.props.children}
        </div>
      </div>
    );
  };

  render() {
    return this.props.isShow ? this._renderModal() : null;
  }
}

export default CustomModal;
