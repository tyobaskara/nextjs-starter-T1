// Components
import Image from '@components/Image.component';

// Utils
import ReactHtmlParser from 'react-html-parser';
import { capitalizeFirstLetter } from '@utils/string.utils';
import { Fragment } from 'react';

export default function AboutSmartHospital(props) {
  const _renderTitle = () => {
    const { content, language } = props;
    const titleKey = 'title' + capitalizeFirstLetter(language);
    const descKey = 'description' + capitalizeFirstLetter(language);

    return (
      <div className='container'>
        <h2 className='title'>{ReactHtmlParser(content[titleKey])}</h2>
        <p className='AboutSmartHospital__intro'>{ReactHtmlParser(content[descKey])}</p>
      </div>
    );
  };

  const _renderItems = () => {
    const { content: { items = [] }, language } = props;

    return (
      <Fragment>
        {items.map((item, index) => {
          if (index === 0) {
            return _renderItem1(item, index);
          }
          if (index === 1) {
            return _renderItem2(item, index);
          }
          if (index === 2) {
            return _renderItem3(item, index);
          }
        })}
      </Fragment>
    );
  };

  const _renderItem1 = (item, index) => {
    const { language } = props;
    const descKey = 'description' + capitalizeFirstLetter(language);
    const desktopImageKey = 'desktopImage' + capitalizeFirstLetter(language);

    return (
      <div 
        className='AboutSmartHospital__content AboutSmartHospital__content-1'
        key={index}
      >
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6 order-lg-last'>
              <Image 
                src={item[desktopImageKey]}
              />
            </div>
            <div className='col-lg-6 order-lg-first'>
              <p>{ReactHtmlParser(item[descKey])}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const _renderItem2 = (item, index) => {
    const { language } = props;
    const descKey = 'description' + capitalizeFirstLetter(language);
    const desktopImageKey = 'desktopImage' + capitalizeFirstLetter(language);

    return (
      <div 
        className='AboutSmartHospital__content AboutSmartHospital__content-2'
        key={index}
      >
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6'>
              <Image 
                src={item[desktopImageKey]}
              />
            </div>
            <div className='col-lg-6'>
              <p>{ReactHtmlParser(item[descKey])}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const _renderItem3 = (item, index) => {
    const { language } = props;
    const desktopImageKey = 'desktopImage' + capitalizeFirstLetter(language);

    return (
      <div 
        className='AboutSmartHospital__content AboutSmartHospital__content-3'
        key={index}
      >
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <Image 
                src={item[desktopImageKey]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className='AboutSmartHospital'>
      {_renderTitle()}
      {_renderItems()}
    </section>
  );
}
