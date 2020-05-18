import Slider from 'react-slick';

//Components
import Image from '@components/Image.component';
import ButtonLink from '@components/ButtonLink.component';

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
      {props.content.map(listItem => _renderSliderItem(listItem))}
    </Slider>
  );

  function _renderSliderItem(listItem) {
    const { language } = props;
    const { image, title, description, link } = listItem;

    return (
      <div key={title[language]}>
        <div 
          className='Products__list-item'
          style={{ backgroundImage: "url('/static/images/product-card-bg.png')" }}>
          <Image
            className='Products__list-icon'
            src={image}
          />
          <h3>{ReactHtmlParser(title[language])}</h3>
          <p>{ReactHtmlParser(description[language])}</p>
          <div className='Products__list-btn'>
            <ButtonLink 
              link={link}
              text='Explore More'
            />
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <section className='Products'>
      <div className='container'>
        <h2 className='title'>Products</h2>
      </div>

      <div className='container container--dots'>
        {_renderSlider()}
      </div>
    </section>
  )
}

export default Products;
