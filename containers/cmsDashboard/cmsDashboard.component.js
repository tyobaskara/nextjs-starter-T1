import { PureComponent } from 'react';

// layout
import CmsLayout from '../../components/_layouts/cms.layout';

export default class CmsDashboard extends PureComponent {
  render() {
    return (
      <CmsLayout {...this.props}>
        <div className='cms-wrapper'>
          <div className='cms-container'>
            <h1>Dashboard Page</h1>
          </div>
        </div>
      </CmsLayout>
    )
  }
}
