import React, { PureComponent } from 'react'

// Components
import Image from '@components/Image.component';

// Utils
import ReactHtmlParser from 'react-html-parser';
import { capitalizeFirstLetter } from '@utils/string.utils';

export default class AboutChallenge extends PureComponent {
  _renderTitle = () => {
    const { content, language } = this.props;
    const titleKey = 'title' + capitalizeFirstLetter(language);

    return (
      <h1 className='title'>{ReactHtmlParser(content[titleKey])}</h1>
    );
  };

  _renderDescription = () => {
    const { content, language } = this.props;
    const descKey = 'description' + capitalizeFirstLetter(language);
    const imageKey = 'desktopImage' + capitalizeFirstLetter(language);

    return (
      <div className='aboutChallenge__content clearfix'>
        <Image 
          src={content[imageKey]}
        />
        <p>{ReactHtmlParser(content[descKey])}</p>
      </div>
    );
  };

  render() {
    return (
      <section className='aboutChallenge'>
        <div className='container'>
          {this._renderTitle()}
          {this._renderDescription()}
        </div>
      </section>
    )
  }
}
