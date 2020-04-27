import { PureComponent } from 'react';

// Components
import Image from '@components/Image.component';
import YoutubeEmbed from '@components/YoutubeEmbed.component';

const imageData = {
  src: '/static/images/product-exellences-bg.png',
  srcSet: [
    '/static/images/product-exellences-bg@2x.png',
    '/static/images/product-exellences-bg@3x.png'
  ]
}

export default class ProductExellences extends PureComponent {
  _renderLeftContent = () => {
    return (
      <div className='col-sm-6 productExcellences__left'>
        <YoutubeEmbed 
          className='productExcellences__youtube'
          youtubeId='5Peo-ivmupE'
        />
      </div>
    );
  };

  _renderRightContent = () => {
    return (
      <div className='col-sm-6 productExcellences__right'>

        <ul className='productExcellences__list'>
          <li>
            <Image 
              src='/static/images/product-excellences-icon-1.png'
              className='productExcellences__list-icon'
            />
            <h3>Well-Design Solution</h3>
            <p>Designed by using top-down approaches, from business capabilities to system functionality.</p>
          </li>

          <li>
            <Image 
              src='/static/images/product-excellences-icon-2.png'
              className='productExcellences__list-icon'
            />
            <h3>Highly Standardized</h3>
            <p>Fulfilling the high standards of KARS (Komisi Akreditas Rumah Sakit), both in administration recording and patient data representation.</p>
          </li>

          <li>
            <Image 
              src='/static/images/product-excellences-icon-3.png'
              className='productExcellences__list-icon'
            />
            <h3>Flexibly Interoperable</h3>
            <p>Able to manage all data growth, modules and features addition, without decreasing system productivity.</p>
          </li>

          <li>
            <Image 
              src='/static/images/product-excellences-icon-4.png'
              className='productExcellences__list-icon'
            />
            <h3>Advanced, yet Simple & Easy to Use</h3>
            <p>Optimal user interface that creates simplicity and ease-of-use for doctor, nurse, and hospital management.</p>
          </li>
        </ul>

      </div>
    );
  };

  render() {
    return (
      <section className='productExcellences'>
        <div className='container'>
        
          <h2 className='title'>Product Exellences</h2>

          <div className='row'>
            {this._renderLeftContent()}
            {this._renderRightContent()}
          </div>

        </div>
      </section>
    )
  }
}
