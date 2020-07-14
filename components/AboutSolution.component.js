// Component
import Image from '@components/Image.component';

// Utils
import ReactHtmlParser from 'react-html-parser';
import { capitalizeFirstLetter } from '@utils/string.utils';

export default function AboutSolution(props) {
  const _renderTitle = () => {
    const { content, language } = props;
    const titleKey = 'title' + capitalizeFirstLetter(language);

    return (
      <h2 className='title'>{ReactHtmlParser(content[titleKey])}</h2>
    );
  };

  const _renderDescription = () => {
    const { content, language } = props;
    const descKey = 'description' + capitalizeFirstLetter(language);

    return (
      <p className='aboutSolution-intro'>{ReactHtmlParser(content[descKey])}</p>
    );
  };

  const _renderImage = () => {
    const { content, language } = props;
    const imageKey = 'desktopImage' + capitalizeFirstLetter(language);

    return (
      <div className='aboutSolution__image'>
        <Image 
          src={content[imageKey]}
        />
      </div>
    );
  };

  return (
    <section className='aboutSolution'>
      <div className='container'>
        {_renderTitle()}
        {_renderDescription()}
        {_renderImage()}
      </div>
    </section>
  );
}
