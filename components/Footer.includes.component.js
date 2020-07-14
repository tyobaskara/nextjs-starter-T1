import { PureComponent } from 'react';
import Link from 'next/link';
import { withTranslation } from '../i18n';
import get from 'lodash/get';

class Footer extends PureComponent {

  _renderFooterLeft = () => {
    return (
      <div className='footer-left'>
        <img 
          src='/static/images/dhealth-logo.png' 
          srcSet='/static/images/dhealth-logo@2x.png 2x, /static/images/dhealth-logo@3x.png 3x'
        />
        <p>One Hospital Management System For All Hospital Needs</p>
      </div>
    );
  };

  _renderFooterMid = () => (
    <div className='row footer-mid'>
      {this._renderSectionAbout()}
      {this._renderSectionProduct()}
      {this._renderSectionContact()}
    </div>
  );

  _renderSectionAbout = () => {
    const { language } = this.props;
    const AboutUsList = {
      id: [
        { route: 'about-us' },
        { route: 'article-and-news' },
        { route: 'testimonial' }
      ],
      en: [
        { route: 'about-us' },
        { route: 'article-and-news' },
        { route: 'testimonial' }
      ]
    };

    return (
      <div className='col-6 col-md-3'>
        <p className='footer-title'>About</p>
        <ul>
          {AboutUsList[language].map(list => {
            const { route } = list;

            return (
              <li key={this.props.t(`${route}-title`)}>
                <Link href={`/${language}/${route}`}>
                  <a>{this.props.t(`${route}-title`)}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  _renderSectionProduct = () => {
    const { language } = this.props;
    const ProductList = {
      id: [
        { route: 'product-front-office' },
        { route: 'product-back-office' },
        { route: 'product-service-1' },
        { route: 'product-service-2' },
        { route: 'product-information'}
      ],
      en: [
        { route: 'product-front-office' },
        { route: 'product-back-office' },
        { route: 'product-service-1' },
        { route: 'product-service-2' },
        { route: 'product-information'}
      ]
    };
    
    return (
      <div className='col-6 col-md-3'>
        <p className='footer-title'>Products</p>
        <ul>
          {ProductList[language].map(list => {
            const { route } = list;

            return (
              <li key={this.props.t(`${route}-title`)}>
                <Link href={`/${language}/${route}`}>
                  <a>{this.props.t(`${route}-title`)}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  _renderSectionContact = () => {
    const { footerData = {} } = this.props;
    const phone = get(footerData, 'phone', '');
    const mail = get(footerData, 'mail', '');
    const addressLink = get(footerData, 'addressLink', '');
    const addressText = get(footerData, 'addressText', '');

    return (
      <div className='col-12 col-md-6'>
        <p className='footer-title'>Contact</p>
        <ul className='footer-contact'>
          <li>
            <a href={`tel:${phone}`}>
              <img 
                src='/static/images/icon-call.png' 
                srcSet='/static/images/icon-call@2x.png 2x, /static/images/icon-call@3x.png 3x'
              />
              <span>{phone}</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${mail}`}>
              <img 
                src='/static/images/icon-envelope.png' 
                srcSet='/static/images/icon-envelope@2x.png 2x, /static/images/icon-envelope@3x.png 3x'
              />
              <span>{mail}</span>
            </a>
          </li>
          <li>
            <a href={addressLink} target='_blank'>
              <img 
                src='/static/images/icon-location.png' 
                srcSet='/static/images/icon-location@2x.png 2x, /static/images/icon-location@3x.png 3x'
              />
              <span>{addressText}</span>
            </a>
          </li>
        </ul>
      </div>
    );
  };

  _renderFooterRight = () => {
    const { footerData } = this.props;
    const socialMedia = get(footerData, 'socialMedia', []);

    return (
      <div className='footer-right'>
        <ul className='footer-media'>
          {socialMedia.map(item => (
            <li key={item.id}>
              <a href={item.link} target='_blank'>
                <img 
                  src={item.icon}
                  alt={item.name}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  render() {
    return (
      <footer className='footer'>
        <div className="container">
          <div className='footer-wrapper clearfix'>
            {this._renderFooterLeft()}
            {this._renderFooterMid()}
            {this._renderFooterRight()}
          </div>
          <p className='footer__bottom'>Powered by DOCOTEL</p>
        </div>
      </footer>
    )
  }
}

export default withTranslation('pages')(Footer);
