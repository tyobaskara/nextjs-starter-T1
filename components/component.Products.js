import Slider from 'react-slick';
import { withTranslation } from '../i18n';

//Components
import Image from '@components/component.Image';
import ButtonLink from '@components/component.ButtonLink';

// Utils
import ReactHtmlParser from 'react-html-parser';

function Products(props) {
  const slickSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: true,
          infinite: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          infinite: false
        }
      }
    ]
  };

  const _renderSlider = () => (
    <Slider 
      className='Products__list'
      {...slickSettings}
    >
      {props.content.map((listItem, index) => _renderSliderItem(listItem, index))}
    </Slider>
  );

  function _renderSliderItem(listItem, index) {
    const { language } = props;
    const { image, title, description, link } = listItem;

    return (
      <div key={title[language]}>
        <div 
          className='Products__list-item'
          style={{ backgroundImage: `url('/static/images/product-card-bg-${index + 1}.png')` }}>
          <Image
            className='Products__list-icon'
            src={image}
            alt={title[language]}
          />
          <h3>{ReactHtmlParser(title[language])}</h3>
          <p>{ReactHtmlParser(description[language])}</p>
          <div className='Products__list-btn'>
            <ButtonLink 
              link={link}
              text={props.t('explore-more')}
              language={language}
            />
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <section className='Products'>
      <div className='container'>
        <h2 className='title'>{props.t('products')}</h2>
      </div>

      <div className='container container--dots'>
        {_renderSlider()}
      </div>
    </section>
  )
}

export default withTranslation('common')(Products);