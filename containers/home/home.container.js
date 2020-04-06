import React, { PureComponent } from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

class Container extends PureComponent {
  _showModal = () => {
    MySwal.fire({
      icon: 'success',
      customClass: {
        title: 'Swal-Custom-Class'
      },
      title: 'Swal Title',
      text: 'Swal Text',
      showConfirmButton: false
    });
    
    setTimeout(() => MySwal.close(), 5000);
  };

  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <button onClick={this._showModal} className="btn btn-info">Show Modal</button>
      </div>
    )
  }
}

export default Container;
