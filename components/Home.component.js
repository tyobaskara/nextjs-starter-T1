import { PureComponent } from 'react';

// Components
import HeroBanner from '@components/HeroBanner.component';
import ProductExellences from '@components/ProductExellences.component';
import KeyFeatures from '@components/KeyFeatures.component';
import Products from '@components/Products.component';
import Clients from '@components/Clients.component';
import Testimonial from '@components/Testimonial.component';
import ArticleAndNews from '@components/ArticleAndNews.component';
import CoverageOfClients from '@components/CoverageOfClients.component';

class Container extends PureComponent {
  render() {
    const { language, content } = this.props;
    console.log(content);

    return (
      <div>
        <HeroBanner language={language} />
        <ProductExellences/>
        <KeyFeatures/>
        <Products language={language} />
        <Clients/>
        <Testimonial language={language} />
        <ArticleAndNews language={language} />
        <CoverageOfClients />
      </div>
    )
  }
}

export default Container;
