import { PureComponent } from 'react';
import Link from 'next/link';

// Utils
import { navigateTo } from '@utils/navigation.utils';
import { validateHttp } from '@utils/string.utils';

export default class ButtonLink extends PureComponent {
  _renderButtonLink = () => validateHttp(this.props.link) ? 
    this._renderLink() : this._renderLinkRoute();

  _renderLink = () => {
    const { link, text } = this.props;

    return (
      <a 
        className='btn-blue'
        href={link}
        target='_blank'
      >{text}</a>
    );
  };

  _renderLinkRoute = () => {
    const { link, text, language } = this.props;

    return (
      <Link href={navigateTo(link, language)}>
        <a 
          className='btn-blue'
        >{text}</a>
      </Link>
    );
  };

  render() {
    return this._renderButtonLink();
  }
}
