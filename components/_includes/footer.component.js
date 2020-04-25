import { PureComponent } from 'react';
import Link from 'next/link';

export default class Footer extends PureComponent {

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
        {
          name: 'Tentang Kami',
          route: 'about-us'
        },
        {
          name: 'Artikel dan Berita',
          route: 'article-and-news'
        },
        {
          name: 'Testimonial',
          route: 'testimonial'
        }
      ],
      en: [
        {
          name: 'About Us',
          route: 'about-us'
        },
        {
          name: 'Article and News',
          route: 'article-and-news'
        },
        {
          name: 'Testimonial',
          route: 'testimonial'
        }
      ]
    };

    return (
      <div className='col-6 col-md-3'>
        <p className='footer-title'>About</p>
        <ul>
          {AboutUsList[language].map(list => {
            const { name, route } = list;

            return (
              <li key={name}>
                <Link href={`/${language}/${route}`}>
                  <a>{name}</a>
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
        {
          name: 'Front Office',
          route: 'front-office'
        },
        {
          name: 'Back Office',
          route: 'back-office'
        },
        {
          name: 'Supporting 1',
          route: 'supporting-1'
        },
        {
          name: 'Supporting 2',
          route: 'supporting-2'
        },
        {
          name: 'Information',
          route: 'information'
        }
      ],
      en: [
        {
          name: 'Front Office',
          route: 'front-office'
        },
        {
          name: 'Back Office',
          route: 'back-office'
        },
        {
          name: 'Supporting 1',
          route: 'supporting-1'
        },
        {
          name: 'Supporting 2',
          route: 'supporting-2'
        },
        {
          name: 'Information',
          route: 'information'
        }
      ]
    };
    
    return (
      <div className='col-6 col-md-3'>
        <p className='footer-title'>Products</p>
        <ul>
          {ProductList[language].map(list => {
            const { name, route } = list;

            return (
              <li key={name}>
                <Link href={`/${language}/${route}`}>
                  <a>{name}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  _renderSectionContact = () => (
    <div className='col-12 col-md-6'>
      <p className='footer-title'>Contact</p>
      <ul className='footer-contact'>
        <li>
          <a href="tel:+62216302626">
            <img 
              src='/static/images/icon-call.png' 
              srcSet='/static/images/icon-call@2x.png 2x, /static/images/icon-call@3x.png 3x'
            />
            <span>+62 21 630 2626</span>
          </a>
        </li>
        <li>
          <a href='mailto:info@dhealth.co.id'>
            <img 
              src='/static/images/icon-envelope.png' 
              srcSet='/static/images/icon-envelope@2x.png 2x, /static/images/icon-envelope@3x.png 3x'
            />
            <span>info@dhealth.co.id</span>
          </a>
        </li>
        <li>
          <a href='https://goo.gl/maps/icvWn2YWpKQNjsWMA' target='_blank'>
            <img 
              src='/static/images/icon-location.png' 
              srcSet='/static/images/icon-location@2x.png 2x, /static/images/icon-location@3x.png 3x'
            />
            <span>Jl.KH.Hasyim Ashari No.26, RT.1/RW.4, Petojo Utara, Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10130</span>
          </a>
        </li>
      </ul>
    </div>
  );

  _renderFooterRight = () => {
    return (
      <div className='footer-right'>
        <ul className='footer-media'>
          <li>
            <a href='#'>
              <img 
                src='/static/images/icon-facebook.png' 
                srcSet='/static/images/icon-facebook@2x.png 2x, /static/images/icon-facebook@3x.png 3x'
              />
            </a>
          </li>
          <li>
            <a href='#'>
              <img 
                src='/static/images/icon-instagram.png' 
                srcSet='/static/images/icon-instagram@2x.png 2x, /static/images/icon-instagram@3x.png 3x'
              />
            </a>
          </li>
          <li>
            <a href='#'>
              <img 
                src='/static/images/icon-youtube.png' 
                srcSet='/static/images/icon-youtube@2x.png 2x, /static/images/icon-youtube@3x.png 3x'
              />
            </a>
          </li>
          <li>
            <a href='#'>
              <img 
                src='/static/images/icon-linkedin.png' 
                srcSet='/static/images/icon-linkedin@2x.png 2x, /static/images/icon-linkedin@3x.png 3x'
              />
            </a>
          </li>
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
        </div>
      </footer>
    )
  }
}
