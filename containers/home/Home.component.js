import { PureComponent } from 'react';

// Components
import HeroBanner from '~/components/HeroBanner/HeroBanner.component';
import ProductExellences from '~/components/ProductExellences/ProductExellences.component';
import KeyFeatures from '~/components/KeyFeatures/KeyFeatures.component';
import Products from '~/components/Products/Products.component';
import Clients from '~/components/Clients/Clients.component';
import Testimonial from '~/components/Testimonial/Testimonial.component';
import ArticleAndNews from '~/components/ArticleAndNews/ArticleAndNews.component';
import CoverageOfClients from '~/components/CoverageOfClients/CoverageOfClients.component';

class Container extends PureComponent {
  render() {
    const { language } = this.props;

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
