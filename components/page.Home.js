import { PureComponent } from 'react';
import { withTranslation } from '../i18n';

// Components
import HeroBanner from '@components/component.HeroBanner';
import ProductExellences from '@components/component.ProductExellences';
import KeyFeatures from '@components/component.KeyFeatures';
import Products from '@components/component.Products';
import Clients from '@components/component.Clients';
import Testimonial from '@components/component.Testimonial';
import ArticleAndNews from '@components/component.ArticleAndNews';
import CoverageOfClients from '@components/component.CoverageOfClients';
import FormFreeDemo from '@components/component.FormFreeDemo';

const isServer = typeof window === 'undefined';
const WOW = !isServer ? require('wow.js') : null;

class Home extends PureComponent {
  state = {
    isShowFreeDemoModal: false
  }

  componentDidMount() {
    new WOW().init();
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
    const { language, content, testimonialData, articleAndNewsData } = this.props;
    const { mainBanner, productExellence, keyFeatures, 
      products, clients, clientCoverages } = content;

    return (
      <div className='headerGap'>
        <div className='wow fadeIn'>
          <HeroBanner 
            language={language} 
            content={mainBanner}
            onFreeDemoOpen={this.onFreeDemoOpen}
            onFreeDemoClose={this.onFreeDemoClose}
          />
        </div>
        <div className='wow fadeIn'>
          <ProductExellences
            language={language}
            content={productExellence}
          />
        </div>
        <div className='wow fadeIn'>
          <KeyFeatures
            language={language}
            content={keyFeatures}
          />
        </div>
        <div className='wow fadeIn'>
          <Products 
            language={language} 
            content={products}
          />
        </div>
        <div className='wow fadeIn'>
          <Clients
            language={language} 
            content={clients}
          />
        </div>
        <div className='wow fadeIn'>
          <Testimonial language={language} content={testimonialData}/>
        </div>
        <div className='wow fadeIn'>
          <ArticleAndNews language={language} content={articleAndNewsData} />
        </div>
        <div className='wow fadeIn'>
          <CoverageOfClients language={language} content={clientCoverages} />
        </div>

        {this._renderModalFreeDemo()}
      </div>
    )
  }
}

export default withTranslation('pages')(Home);
