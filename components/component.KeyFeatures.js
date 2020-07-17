import { withTranslation } from '../i18n';

//Components
import Image from '@components/component.Image';

// Utils
import ReactHtmlParser from 'react-html-parser';

function KeyFeatures(props) {
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
          alt={text[language]}
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
        <h2 className='title'>{props.t('key-features')}</h2>

        <div className='KeyFeatures__web-list'>
          {_renderList()}
        </div>
        
      </div>   
    </section>
  );
}

export default withTranslation('common')(KeyFeatures);
