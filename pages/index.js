import { PureComponent } from 'react';
import { withRouter } from 'next/router';

class index extends PureComponent {
  componentDidMount() {
    this.props.router.push('/en/home');
  }

  render() {
    return <div></div>;
  }
}

index.getInitialProps = () => ({
  namespacesRequired: ['common']
});

export default withRouter(index);
