import { PureComponent } from 'react';
import { withRouter } from 'next/router';

class cms extends PureComponent {
  componentDidMount() {
    this.props.router.push('/cms/login');
  }

  render() {
    return <div></div>;
  }
}

cms.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default withRouter(cms);
