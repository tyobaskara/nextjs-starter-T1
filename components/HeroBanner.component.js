import Slider from "react-slick";

// Components
import Image from '@components/Image.component';
import ButtonLink from '@components/ButtonLink.component';

// Utils
import ReactHtmlParser from 'react-html-parser';

export default function HeroBanner(props) {
  const { language } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'heroBanner-slider'
  };

  const _renderSliderItems = () => {
    const { content = [] } = props;

    return content.map(sliderItem => {
      const { desktopBanner, mobileBanner, title, 
        description, button } = sliderItem;

      return (
        <div className='heroBanner-wrapper' key={title}>
          <Image
            className='heroBanner-bg d-none d-sm-block' 
            src={desktopBanner[language]}
          />
          <Image
            className='heroBanner-bg d-block d-sm-none' 
            src={mobileBanner[language]}
          />

          <div className='container'>
            <div className='row'>
              <div className='col-sm-7'>
                <div className='heroBanner__highlight active'>
                  <h1>{ReactHtmlParser(title[language])}</h1>
                  <p>{ReactHtmlParser(description[language])}</p>
                  <ButtonLink
                    link={button.link}
                    text={button.text[language]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  
  return (
    <section className='heroBanner'>
      <Slider {...settings}>
        {_renderSliderItems()}
      </Slider>
    </section>
  );
}
