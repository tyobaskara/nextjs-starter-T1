import Link from 'next/link';
import Slider from 'react-slick';

//Components
import Image from '@components/Image.component';

// Utils
import { navigateTo } from '@utils/navigation.utils';
import { capitalizeFirstLetter } from 'utils/string.utils';
// import ReactHtmlParser from 'react-html-parser';

function Testimonial(props) {
  const { language } = props;
  const slickSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
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

  const _renderSlider = () => {
    const { content } = props;

    return (
      <Slider 
        className='Testimonial__list'
        {...slickSettings}
      >
        {content.map(item => _renderTestimonialItem(item))}
      </Slider>
    );
  };

  const _renderTestimonialItem = (item) => {
    const { photo, name, job } = item;
    const lang = capitalizeFirstLetter(language);
    const quotation = `quotation${lang}`;
    
    return (
      <div key={item.id}>
        <div className='Testimonial__list-item'>
          <div className='Testimonial__list-profile'>
            <Image
              src={photo}
            />
            <h3>{name}</h3>
            <p>{job}</p>
          </div>

          <div className='Testimonial__list-content'>
            <Image 
              className='Testimonial__list-quoteTop'
              src='/static/images/quote-top.png'
            />
            <p>{item[quotation]}</p>
            <Image 
            className='Testimonial__list-quoteBot'
              src='/static/images/quote-bot.png'
            />
          </div>

          <div className='Testimonial__list-btn'>
            <Link href={navigateTo('testimonial', language)}>
              <a className='btn-blue'>Explore More</a>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <section className='Testimonial'>
      <div className='container'>
        <h2 className='title'>Testimonial</h2>
      </div>

      <div className='container container--dots'>
        {_renderSlider()}
      </div>
    </section>
  )
}

export default Testimonial;
