import Slider from 'react-slick';

// Components
import ArticleCard from '@components/ArticleCard.component';

function ArticleAndNews(props) {
  const { language, content = [] } = props;
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
          {content.map(item => {

            return (
              <div key={item.id}>
                <ArticleCard 
                  language={language}
                  content={item}
                  btnName='Explore More'
                  btnLink={`article-and-news-detail?id=${item.id}&title=${item.title}`}
                />
              </div>
            )
          })}
        </Slider>
      </div>
    </section>
  );
}

export default ArticleAndNews;
