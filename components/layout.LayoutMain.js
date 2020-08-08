import { PureComponent } from 'react';
import Head from 'next/head';
import { withTranslation } from '../i18n';

// Components
import Header from '@components/includes.component.Header';
import Footer from '@components/includes.component.Footer';
import FormFreeDemo from '@components/component.FormFreeDemo';

class LayoutMain extends PureComponent {
  state = {
    isShowFreeDemoModal: false
  }

  onFreeDemoOpen = () => {
    this.setState({
      isShowFreeDemoModal: true
    })
  };

  onFreeDemoClose = () => {
    this.setState({
      isShowFreeDemoModal: false
    })
  };

  _renderModalFreeDemo = () => {
    return this.state.isShowFreeDemoModal ? (
      <div className='modal-1'>
        <div className='wrapper'>
          <p className='main-title'>Request Free Demo</p>
          <FormFreeDemo t={this.props.t} parentCallback={this.onFreeDemoClose} type='DEMO'/>
        </div>
        <div className='overlay' onClick={this.onFreeDemoClose}></div>
      </div>
    ) : null;
  };

  render() {
    return (
      <>
        <div className='mainLayout_container'>
          <Head>
            <link rel="icon" href="/static/images/favicon.ico" />
            <link href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css' rel='stylesheet' />
            <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css' rel='stylesheet' />
            <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css" rel="stylesheet" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
  
          <Header 
            activeNav={this.props.activeNav}
            activeNestedNav={this.props.activeNestedNav}
            language={this.props.language}
          />
          {this.props.children}

          <button 
            className='btn-blue floatingDemo'
            onClick={this.onFreeDemoOpen}
          >Request <br/>a Demo</button>
          {this._renderModalFreeDemo()}

          <Footer
            language={this.props.language}
            footerData={this.props.footerData}
          />
        </div>
      </>
    )
  }
};

export default withTranslation('pages')(LayoutMain);
