import { PureComponent } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

class ActionTabList extends PureComponent {
  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.token}`;
  }

  _showRemoveListConfirmModal = url => () => {
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
        }, () => this.fetchRemoveList(url));
      }
    });
  };

  fetchRemoveList = async (url) => {
    const { fetchTabsData } = this.props;

    try {
      await axios.delete(url);
      this.setState({ isLoading: false }, fetchTabsData);
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

  render() {
    const { data = [] } = this.props;
  
    return (
      <ul className="cmsList cmsTabList">
        {data.map((item) => (
          <li className="cmsList__item" key={item.name}>
            <p>{item.name}</p>

            <ul className='cmsTabList__action'>
              <li>
                <Link href={item.editTabRoute}>
                  <a>Edit Tab</a>
                </Link>
              </li>
              <li>
                <Link href={item.editTabListRoute}>
                  <a>Add/Edit Tab Items</a>
                </Link>
              </li>
              <li>
                <button 
                  className='btn btn-danger' 
                  onClick={this._showRemoveListConfirmModal(item.apiRemoveListUrl)}
                >
                  <span>Remove</span>
                </button>
              </li>
            </ul>
  
          </li>
        ))}
      </ul>
    );
  }
}

export default ActionTabList
