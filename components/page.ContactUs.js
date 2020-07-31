import { PureComponent } from "react";
import { withTranslation } from '../i18n';
import get from 'lodash/get';

// Component
import FormFreeDemo from '@components/component.FormFreeDemo';

const isServer = typeof window === 'undefined';
const WOW = !isServer ? require('wow.js') : null;

class ContactUs extends PureComponent {
  componentDidMount() {
    new WOW().init();
  }

  render() {
    const { t, footerData } = this.props;
    const phone = get(footerData, 'phone', '');
    const mail = get(footerData, 'mail', '');
    const addressLink = get(footerData, 'addressLink', '');
    const addressText = get(footerData, 'addressText', '');

    return (
      <div className="contactUs wow fadeIn headerGap">
        <div className='container'>
          <h1 className="title">{t('contact-us-title')}</h1>
          <h2>{t('page-contactUs-subTitle')}</h2>
        </div>

        <div className="container contactUs__container">
          <div className="row">
            <div className="col-lg-6">
              <FormFreeDemo t={t} type='INQUIRY'/>
            </div>
            <div className="col-lg-6">
              <h6 className="contactUs__title">{t('reach-us')}</h6>
              <ul className="contactUs__contact">
                <li>
                  <a href={`tel:${phone}`}>
                    <img
                      src="/static/images/contact-us-call-black.png"
                      srcSet="/static/images/contact-us-call-black@2x.png 2x, /static/images/contact-us-call-black@3x.png 3x"
                    />
                    <p>{phone}</p>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${mail}`}>
                    <img
                      src="/static/images/contact-us-envelope-black.png"
                      srcSet="/static/images/contact-us-envelope-black@2x.png 2x, /static/images/contact-us-envelope-black@3x.png 3x"
                    />
                    <p>{mail}</p>
                  </a>
                </li>
                <li>
                  <a
                    href={addressLink}
                    target="_blank"
                  >
                    <img
                      src="/static/images/contact-us-maps-and-flags-black.png"
                      srcSet="/static/images/contact-us-maps-and-flags-black@2x.png 2x, /static/images/contact-us-maps-and-flags-black@3x.png 3x"
                    />
                    <p>{addressText}</p>
                  </a>
                </li>
              </ul>
              <div className="container">
              <iframe 
                className="contactUs__map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.741158448856!2d106.80902971476878!3d-6.1654079955363015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f677bf7637b3%3A0xc48c3435d810550f!2sJl.%20KH.%20Hasyim%20Ashari%20No.26%2C%20RT.4%2FRW.7%2C%20Petojo%20Utara%2C%20Kecamatan%20Gambir%2C%20Kota%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2010130!5e0!3m2!1sen!2sid!4v1593257004196!5m2!1sen!2sid" >
              </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation('pages')(ContactUs);
