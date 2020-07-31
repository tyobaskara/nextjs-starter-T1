import { PureComponent } from 'react';
import { withTranslation } from '../i18n';

// Components
import Image from '@components/component.Image';
import YoutubeEmbed from '@components/component.YoutubeEmbed';

// Utils
import ReactHtmlParser from 'react-html-parser';

const imageData = {
  src: '/static/images/product-exellences-bg.png',
  srcSet: [
    '/static/images/product-exellences-bg@2x.png',
    '/static/images/product-exellences-bg@3x.png'
  ]
}

class ProductExellences extends PureComponent {
  _renderLeftContent = () => {
    const { content: { videoLink } } = this.props;
    return (
      <div className='col-sm-6 productExellences__left'>
        <YoutubeEmbed 
          className='productExellences__youtube'
          youtubeId={videoLink}
        />
      </div>
    );
  };

  _renderRightContent = () => {
    return (
      <div className='col-sm-6 productExellences__right'>

        <ul className='productExellences__list'>
          {this._renderRightListItems()}
        </ul>

      </div>
    );
  };

  _renderRightListItems = () => {
    const { content: { items = [] }, language } = this.props;

    return items.map(listItem => (
      <li key={listItem.title[language]}>
        <Image 
          src={listItem.image}
          className='productExellences__list-icon'
        />
        <h3>{ReactHtmlParser(listItem.title[language])}</h3>
        <p>{ReactHtmlParser(listItem.description[language])}</p>
      </li>
    ));
  };

  render() {
    return (
      <section className='productExellences'>
        <div className='container'>
        
          <h2 className='title'>{this.props.t('product-exellences')}</h2>

          <div className='row'>
            {this._renderLeftContent()}
            {this._renderRightContent()}
          </div>

        </div>
      </section>
    )
  }
}

export default withTranslation('common')(ProductExellences);