import Link from 'next/link';
import Slider from 'react-slick';

//Components
import Image from '~/components/Image/Image.component';

// Utils
import { navigateTo } from '~/utils/navigation.utils';
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

  function _renderSlider() {
    return (
      <Slider 
        className='Testimonial__list'
        {...slickSettings}
      >
        <div>
          <div className='Testimonial__list-item'>
            <div className='Testimonial__list-profile'>
              <Image
                src='/static/images/keyfeatures-icon1.png'
              />
              <h3>John Doe</h3>
              <p>CEO, RS Budi Kasih</p>
            </div>

            <div className='Testimonial__list-content'>
              <Image 
                className='Testimonial__list-quoteTop'
                src='/static/images/quote-top.png'
              />
              <p>By integrating registration within D’Health, RS Budi Kasih has streamlined their registration process and reduced more than half of their registrations by two to three minutes.</p>
              <Image 
              className='Testimonial__list-quoteBot'
                src='/static/images/quote-bot.png'
              />
            </div>

            <div className='Testimonial__list-btn'>
              <Link href={navigateTo('about-us', language)}>
                <a className='btn-blue'>Explore More</a>
              </Link>
            </div>
          </div>
        </div>
        
        <div>
          <div className='Testimonial__list-item'>
            <div className='Testimonial__list-profile'>
              <Image
                src='/static/images/keyfeatures-icon1.png'
              />
              <h3>John Doe</h3>
              <p>CEO, RS Budi Kasih</p>
            </div>

            <div className='Testimonial__list-content'>
              <Image 
                className='Testimonial__list-quoteTop'
                src='/static/images/quote-top.png'
              />
              <p>By integrating registration within D’Health, RS Budi Kasih has streamlined their registration process and reduced more than half of their registrations by two to three minutes.</p>
              <Image 
              className='Testimonial__list-quoteBot'
                src='/static/images/quote-bot.png'
              />
            </div>

            <div className='Testimonial__list-btn'>
              <Link href={navigateTo('about-us', language)}>
                <a className='btn-blue'>Explore More</a>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div className='Testimonial__list-item'>
            <div className='Testimonial__list-profile'>
              <Image
                src='/static/images/keyfeatures-icon1.png'
              />
              <h3>John Doe</h3>
              <p>CEO, RS Budi Kasih</p>
            </div>

            <div className='Testimonial__list-content'>
              <Image 
                className='Testimonial__list-quoteTop'
                src='/static/images/quote-top.png'
              />
              <p>RS Budi Kasih has streamlined their registration process and reduced more than half of their registrations by two to three minutes.</p>
              <Image 
              className='Testimonial__list-quoteBot'
                src='/static/images/quote-bot.png'
              />
            </div>

            <div className='Testimonial__list-btn'>
              <Link href={navigateTo('about-us', language)}>
                <a className='btn-blue'>Explore More</a>
              </Link>
            </div>
          </div>
        </div>

      </Slider>
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
