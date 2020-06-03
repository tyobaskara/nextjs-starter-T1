import Slider from 'react-slick';

// Components
import Image from '@components/Image.component';

// Utils
import ReactHtmlParser from 'react-html-parser';

export default function Clients(props) {
  const slickSettings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 6,
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

  const _renderList = () => (
    <Slider 
      className='Clients__list'
      {...slickSettings}
    >
      {props.content.map(listItem => _renderListItem(listItem))}
    </Slider>
  );

  const _renderListItem = ({ text, image }) => {
    const { language } = props;

    return (
      <div key={text[language]}>
        <div className='Clients__list-item'>
          <Image 
            src={image}
          />
          <div className='Clients__list-item-content'>
            <span>{ReactHtmlParser(text[language])}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className='Clients section-grey2'>
      <div className='container'>
        <h2 className='title'>Clients</h2>

        {_renderList()}
      </div>
    </section>
  );
}
