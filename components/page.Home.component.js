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

class Home extends PureComponent {
  render() {
    const { language, content, testimonialData, articleAndNewsData } = this.props;
    const { mainBanner, productExellence, keyFeatures, 
      products, clients } = content;

    return (
      <div>
        <HeroBanner 
          language={language} 
          content={mainBanner}
        />
        <ProductExellences
          language={language}
          content={productExellence}
        />
        <KeyFeatures
          language={language}
          content={keyFeatures}
        />
        <Products 
          language={language} 
          content={products}
        />
        <Clients
          language={language} 
          content={clients}
        />
        <Testimonial language={language} content={testimonialData}/>
        <ArticleAndNews language={language} content={articleAndNewsData} />
        <CoverageOfClients />
      </div>
    )
  }
}

export default Home;
