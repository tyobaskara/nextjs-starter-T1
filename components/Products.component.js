import Link from 'next/link';
import Slider from 'react-slick';

//Components
import Image from '@components/Image.component';

// Utils
import { navigateTo } from '@utils/navigation.utils';
// import ReactHtmlParser from 'react-html-parser';

function Products(props) {
  const { language } = props;
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

  function _renderSlider() {
    return (
      <Slider 
          className='Products__list'
          {...slickSettings}
        >
        <div>
          <div 
            className='Products__list-item'
            style={{ backgroundImage: "url('/static/images/bg-products.png')" }}>
            <Image
              className='Products__list-icon'
              src='/static/images/keyfeatures-icon1.png'
            />
            <h3>Front Office</h3>
            <p>Focusing on improving service quality for patient experiences. From the moment patients needed healthcare services, up to the point they are being served inside the hospitals.</p>
            <div className='Products__list-btn'>
              <Link href={navigateTo('about-us', language)}>
                <a className='btn-blue'>Explore More</a>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div 
            className='Products__list-item'
            style={{ backgroundImage: "url('/static/images/bg-products.png')" }}>
            <Image
              className='Products__list-icon'
              src='/static/images/keyfeatures-icon1.png'
            />
            <h3>Back Office</h3>
            <p>The backbone of hospital management. Handling the financial and logistic issues, simplifying the main unit businesses of hospitals.</p>
            <div className='Products__list-btn'>
              <Link href={navigateTo('about-us', language)}>
                <a className='btn-blue'>Explore More</a>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div 
            className='Products__list-item'
            style={{ backgroundImage: "url('/static/images/bg-products.png')" }}>
            <Image
              className='Products__list-icon'
              src='/static/images/keyfeatures-icon1.png'
            />
            <h3>Front Office</h3>
            <p>Focusing on improving service quality for patient experiences. From the moment patients needed healthcare services, up to the point they are being served inside the hospitals.</p>
            <div className='Products__list-btn'>
              <Link href={navigateTo('about-us', language)}>
                <a className='btn-blue'>Explore More</a>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div 
            className='Products__list-item'
            style={{ backgroundImage: "url('/static/images/bg-products.png')" }}>
            <Image
              className='Products__list-icon'
              src='/static/images/keyfeatures-icon1.png'
            />
            <h3>Front Office</h3>
            <p>Focusing on improving service quality for patient experiences. From the moment patients needed healthcare services, up to the point they are being served inside the hospitals.</p>
            <div className='Products__list-btn'>
              <Link href={navigateTo('about-us', language)}>
                <a className='btn-blue'>Explore More</a>
              </Link>
            </div>
          </div>
        </div>

        <div>
          <div 
            className='Products__list-item'
            style={{ backgroundImage: "url('/static/images/bg-products.png')" }}>
            <Image
              className='Products__list-icon'
              src='/static/images/keyfeatures-icon1.png'
            />
            <h3>Front Office</h3>
            <p>Focusing on improving service quality for patient experiences. From the moment patients needed healthcare services, up to the point they are being served inside the hospitals.</p>
            <div className='Products__list-btn'>
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
