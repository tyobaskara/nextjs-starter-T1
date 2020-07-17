import { PureComponent } from 'react';

// Components
import HeroBanner from '@components/component.HeroBanner';
import ProductExellences from '@components/component.ProductExellences';
import KeyFeatures from '@components/component.KeyFeatures';
import Products from '@components/component.Products';
import Clients from '@components/component.Clients';
import Testimonial from '@components/component.Testimonial';
import ArticleAndNews from '@components/component.ArticleAndNews';
import CoverageOfClients from '@components/component.CoverageOfClients';

const isServer = typeof window === 'undefined';
const WOW = !isServer ? require('wow.js') : null;

class Home extends PureComponent {
  componentDidMount() {
    new WOW().init();
  }

  render() {
    const { language, content, testimonialData, articleAndNewsData } = this.props;
    const { mainBanner, productExellence, keyFeatures, 
      products, clients } = content;

    return (
      <div className='headerGap'>
        <div className='wow fadeIn'>
          <HeroBanner 
            language={language} 
            content={mainBanner}
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
          <CoverageOfClients />
        </div>
      </div>
    )
  }
}

export default Home;
