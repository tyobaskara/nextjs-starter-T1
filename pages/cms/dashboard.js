import { PureComponent } from 'react';

// HOC
import WithToken from '../../hoc/WithToken';

// Component
import AdminLayout from '../../components/_layouts/AdminLayout';

export class dashboard extends PureComponent {
  render() {
    return (
      <AdminLayout>
        <div className="container">
          <h1>Dashboard</h1>
          <button className="btn btn-danger" onClick={this.props.onLogOut}>logout</button>
        </div>
      </AdminLayout>
    )
  }
}

export default WithToken({
  name: 'loggedInToken'
})(dashboard);
