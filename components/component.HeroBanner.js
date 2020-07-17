import { PureComponent } from 'react';
import Slider from "react-slick";
import isEmpty from 'lodash/isEmpty';
import { withTranslation } from '../i18n';

// Components
import Image from '@components/component.Image';
import ButtonLink from '@components/component.ButtonLink';
import FormFreeDemo from '@components/component.FormFreeDemo';

// Utils
import ReactHtmlParser from 'react-html-parser';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  className: 'heroBanner-slider',
  responsive: [
    {
      breakpoint: 920,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        infinite: true,
        // adaptiveHeight: true
      }
    }
  ]
};

class HeroBanner extends PureComponent {
  state = {
    isShowFreeDemoModal: false
  }

  _renderSliderItems = () => {
    const { content = [], language } = this.props;

    return content.map(sliderItem => {
      const { desktopBanner, mobileBanner, title } = sliderItem;

      return (
        <div className='heroBanner-wrapper' key={title}>
          <Image
            className='heroBanner-bg d-none d-sm-block' 
            src={desktopBanner[language]}
            alt={title}
          />
          <Image
            className='heroBanner-bg d-block d-sm-none' 
            src={mobileBanner[language]}
            alt={title}
          />

          {this._renderBannerContent(sliderItem)}
        </div>
      );
    });
  }

  _renderBannerContent = (sliderItem) => {
    const { language } = this.props;
    const { title, description, button } = sliderItem;
    
    if (isEmpty(title[language]) 
      && isEmpty(description[language]) 
      && isEmpty(button.text[language])
      && isEmpty(button.link)) return null;

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-7'>
            <div className='heroBanner__highlight active'>
              <h1>{ReactHtmlParser(title[language])}</h1>
              <p>{ReactHtmlParser(description[language])}</p>
              {this._renderButtonLink(button.link, button.text[language])}
            </div>
          </div>
        </div>
      </div>
    );
  };

  _renderButtonLink = (link, title) => {
    const { language } = this.props;

    if (link == 'freeDemo') {
      return this._renderFreeDemoBtn(title);
    }

    return (
      <ButtonLink
        link={link}
        text={title}
        language={language}
      />
    );
  };

  _renderFreeDemoBtn = (title) => {
    return (
      <button 
        className='btn-blue' 
        onClick={this.onFreeDemoClick}
      >
        {title}
      </button>
    );
  };

  onFreeDemoClick = () => {
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
      <div className='modal-1 wow fadeIn'>
        <div className='wrapper wow fadeInDown'>
          <p className='main-title'>Request Free Demo</p>
          <FormFreeDemo t={this.props.t} parentCallback={this.onFreeDemoClose} type='DEMO'/>
        </div>
        <div className='overlay' onClick={this.onFreeDemoClose}></div>
      </div>
    ) : null;
  };

  render() {
    return (
      <section className='heroBanner'>
        <Slider {...settings}>
          {this._renderSliderItems()}
        </Slider>

        {this._renderModalFreeDemo()}
      </section>
    );
  }
}

export default withTranslation('pages')(HeroBanner);
