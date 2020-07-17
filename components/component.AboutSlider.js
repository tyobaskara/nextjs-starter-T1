import Slider from "react-slick";

// Utils
import ReactHtmlParser from 'react-html-parser';
import { capitalizeFirstLetter } from '@utils/string.utils';

export default function AboutSlider(props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          infinite: true,
          adaptiveHeight: true
        }
      }
    ]
  };

  const _renderSlider = () => {
    const { content: { items = [], desktopImage } } = props;

    return (
      <div 
        className='aboutSlider'
        style={{backgroundImage: `url(${desktopImage})`}}
      >
        <Slider {...settings}>
          {items.map(item => (
            _renderSliderItem(item)
          ))}
        </Slider>
      </div>
    );
  };
  
  const _renderSliderItem = (item) => {
    const { language } = props;
    const descKey = 'description' + capitalizeFirstLetter(language);
    const titleKey = 'title' + capitalizeFirstLetter(language);

    return (
      <div className='aboutSlider__wrapper' key={item[titleKey]}>
        <div className='container'>
          <h2>{ReactHtmlParser(item[titleKey])}</h2>
          <p>{ReactHtmlParser(item[descKey])}</p>
        </div>
      </div>
    );
  };
  
  return (
    <section className='aboutSlider'>
      {_renderSlider()}
    </section>
  );
}
