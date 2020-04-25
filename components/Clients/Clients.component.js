import Slider from 'react-slick';

// Components
import Image from '~/components/Image/Image.component';

const slickSettings = {
  dots: false,
  infinite: false,
  arrows: true,
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

export default function Clients() {
  return (
    <section className='Clients section-grey2'>
      <div className='container'>
        <h2 className='title'>Clients</h2>

        <Slider 
          className='Clients__list'
          {...slickSettings}
        >
          <div>
            <div className='Clients__list-item'>
              <Image 
                src='/static/images/clients-2.png'
              />
              <div className='Clients__list-item-content'>
                <span>Rumah sakit <br/>Kramat 128</span>
              </div>
            </div>
          </div>

          <div>
            <div className='Clients__list-item'>
              <Image 
                src='/static/images/clients-2.png'
              />
              <div className='Clients__list-item-content'>
                <span>Rumah sakit <br/>Kramat 128</span>
              </div>
            </div>
          </div>

          <div>
            <div className='Clients__list-item'>
              <Image 
                src='/static/images/clients-2.png'
              />
              <div className='Clients__list-item-content'>
                <span>Rumah sakit <br/>Kramat 128</span>
              </div>
            </div>
          </div>

          <div>
            <div className='Clients__list-item'>
              <Image 
                src='/static/images/clients-2.png'
              />
              <div className='Clients__list-item-content'>
                <span>Rumah sakit <br/>Kramat 128</span>
              </div>
            </div>
          </div>

          <div>
            <div className='Clients__list-item'>
              <Image 
                src='/static/images/clients-2.png'
              />
              <div className='Clients__list-item-content'>
                <span>Rumah sakit <br/>Kramat 128</span>
              </div>
            </div>
          </div>

          <div>
            <div className='Clients__list-item'>
              <Image 
                src='/static/images/clients-2.png'
              />
              <div className='Clients__list-item-content'>
                <span>Rumah sakit <br/>Kramat 128</span>
              </div>
            </div>
          </div>

          <div>
            <div className='Clients__list-item'>
              <Image 
                src='/static/images/clients-2.png'
              />
              <div className='Clients__list-item-content'>
                <span>Rumah sakit <br/>Kramat 128</span>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
}
