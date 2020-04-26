import Link from 'next/link';
import Slider from "react-slick";

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
          <img 
            className='heroBanner-bg' 
            src='https://dummyimage.com/1920x514/333333/ffffff&text=1920x514'  
          />

          <div className='container'>
            <div className='row'>
              <div className='col-sm-8'>
                <div className='heroBanner__highlight active'>
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
          <img 
            className='heroBanner-bg' 
            src='https://dummyimage.com/1920x514/333333/ffffff&text=1920x514'  
          />

          <div className='container'>
            <div className='row'>
              <div className='col-sm-8'>
                <div className='heroBanner__highlight'>
                  <h2>One Hospital <br/>Management System <br/>For All Hospital Needs</h2>
                  <p>Thought experiments (Gedankenexperimenten) are “facts” in the sense that they have a “real life” correlate in the form of electrochemical activity in the brain.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Slider>
    </section>
  );
}
