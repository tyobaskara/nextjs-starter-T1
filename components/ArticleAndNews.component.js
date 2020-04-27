import Slider from 'react-slick';
import Link from 'next/link';

// Components
import Image from '@components/Image.component';

// Utils
import { navigateTo } from '@utils/navigation.utils';
// import ReactHtmlParser from 'react-html-parser';

function ArticleAndNews(props) {
  const { language } = props;
  const slickSettings = {
    dots: false,
    infinite: false,
    arrows: true,
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

  return (
    <section className='ArticleAndNews section-grey2'>
      <div className='container'>
        <h2 className='title'>Article and News</h2>

        <Slider 
          className='ArticleAndNews__list'
          {...slickSettings}
        >

          <div>
            <Link href={navigateTo('about-us', language)}>
              <a className='ArticleAndNews__list-item'>
                <div className='ArticleAndNews__list-top'>
                  <Image 
                    src='/static/images/clients-2.png'
                  />
                  <span 
                    className='ArticleAndNews__list-tag'
                    style={{ backgroundColor: 'tomato' }}
                  >
                    Article
                  </span>
                </div>

                <div className='ArticleAndNews__list-item-content'>
                  <h3
                    title='Upgrading To Microsoft Windows Vista Tips'
                  >Upgrading To Microsoft Windows Vista Tips</h3>
                  <p>By Abul Hasan Milon |  02 Feb 2019</p>
                </div>

                <div className='ArticleAndNews__list-item-btn'>
                  <div className='btn-blue'>
                    Explore More
                  </div>
                </div>
              </a>
            </Link>
          </div>

          <div>
            <Link href={navigateTo('about-us', language)}>
              <a className='ArticleAndNews__list-item'>
                <div className='ArticleAndNews__list-top'>
                  <Image 
                    src='/static/images/clients-2.png'
                  />
                  <span 
                    className='ArticleAndNews__list-tag'
                    style={{ backgroundColor: 'tomato' }}
                  >
                    Article
                  </span>
                </div>

                <div className='ArticleAndNews__list-item-content'>
                  <h3
                    title='Upgrading To Microsoft Windows Vista Tips Lorem Ipsum Dolor'
                  >Upgrading To Microsoft Windows Vista Tips Lorem Ipsum Dolor</h3>
                  <p>By Abul Hasan Milon |  02 Feb 2019</p>
                </div>

                <div className='ArticleAndNews__list-item-btn'>
                  <div className='btn-blue'>
                    Explore More
                  </div>
                </div>
              </a>
            </Link>
          </div>

          <div>
            <Link href={navigateTo('about-us', language)}>
              <a className='ArticleAndNews__list-item'>
                <div className='ArticleAndNews__list-top'>
                  <Image 
                    src='/static/images/clients-2.png'
                  />
                  <span 
                    className='ArticleAndNews__list-tag'
                    style={{ backgroundColor: 'tomato' }}
                  >
                    Article
                  </span>
                </div>

                <div className='ArticleAndNews__list-item-content'>
                  <h3
                    title='Upgrading To Microsoft Windows Vista Tips'
                  >Upgrading To Microsoft Windows Vista Tips</h3>
                  <p>By Abul Hasan Milon |  02 Feb 2019</p>
                </div>

                <div className='ArticleAndNews__list-item-btn'>
                  <div className='btn-blue'>
                    Explore More
                  </div>
                </div>
              </a>
            </Link>
          </div>

        </Slider>
      </div>
    </section>
  );
}

export default ArticleAndNews;
