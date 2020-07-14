//Components
import Image from '@components/Image.component';

// Utils
import ReactHtmlParser from 'react-html-parser';

export default function KeyFeatures(props) {
  const _renderList = () => {
    const { content } = props;
    
    return (
      <ul className='KeyFeatures__list'>
        {content.map((item, index) => _renderListItem(item, index))}
      </ul>
    );
  };

  const _renderListItem = ({ image, text }, index) => {
    const { language } = props;
    const listClass = index < 5 ? 'width-20' : 'width-25';

    return (
      <li className={listClass} key={image}>
        <Image 
          className='KeyFeatures__list-image'
          src={image}
        />
        <p className='KeyFeatures__list-desc'>
          {ReactHtmlParser(text[language])}
        </p>
      </li>
    );
  };

  return (
    <section className='KeyFeatures section-grey2'>
      <div className='container'>
        <h2 className='title'>Key Features</h2>

        <div className='KeyFeatures__web-list'>
          {_renderList()}
        </div>
        
      </div>   
    </section>
  );
}
