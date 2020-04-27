import Link from 'next/link';
import Slider from "react-slick";

// Components
import Image from '@components/Image.component';

// Utils
import { navigateTo } from '@utils/navigation.utils';
// import ReactHtmlParser from 'react-html-parser';

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
  
  return (
    <section className='heroBanner'>
      <Slider {...settings}>
      
        <div className='heroBanner-wrapper'>
          <Image
            className='heroBanner-bg' 
            src='/static/images/banner-1.png'
            srcSet={['/static/images/banner-1@2x.png', '/static/images/banner-1@3x.png']}
          />

          <div className='container'>
            <div className='row'>
              <div className='col-sm-7'>
                <div className='heroBanner__highlight'>
                  <h1>One Hospital <br/>Management System <br/>For All Hospital Needs</h1>
                  <p>Thought experiments (Gedankenexperimenten) are “facts” in the sense that they have a “real life” correlate in the form of electrochemical activity in the brain.</p>
                  <Link href={navigateTo('about-us', language)}>
                    <a className='btn-blue'>See More Testimonial</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      
        <div className='heroBanner-wrapper'>
          <Image
            className='heroBanner-bg' 
            src='/static/images/banner-2.png'
            srcSet={['/static/images/banner-2@2x.png', '/static/images/banner-2@3x.png']}
          />
        </div>

        <div className='heroBanner-wrapper'>
          <Image
            className='heroBanner-bg' 
            src='/static/images/banner-3.png'
            srcSet={['/static/images/banner-3@2x.png', '/static/images/banner-3@3x.png']}
          />
        </div>

        <div className='heroBanner-wrapper'>
          <Image
            className='heroBanner-bg'
            src='/static/images/banner-4.png'
            srcSet={['/static/images/banner-4@2x.png', '/static/images/banner-4@3x.png']}
          />
        </div>

        <div className='heroBanner-wrapper'>
          <Image
            className='heroBanner-bg'
            src='/static/images/banner-5.png'
            srcSet={['/static/images/banner-5@2x.png', '/static/images/banner-5@3x.png']}
          />

          <div className='container'>
            <div className='row'>
              <div className='col-sm-7'>
                <div className='heroBanner__highlight'>
                  <h1>One Hospital <br/>Management System <br/>For All Hospital Needs</h1>
                  <p>Thought experiments (Gedankenexperimenten) are “facts” in the sense that they have a “real life” correlate in the form of electrochemical activity in the brain.</p>
                  <Link href={navigateTo('about-us', language)}>
                    <a className='btn-blue'>See More Testimonial</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

      </Slider>
    </section>
  );
}
