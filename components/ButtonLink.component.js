import Link from 'next/link';

// Utils
import { navigateTo } from '@utils/navigation.utils';
import { validateHttp } from '@utils/string.utils';

export default function ButtonLink(props) {
  const { link, text, language } = props;

  const _renderButtonLink = () => validateHttp(link) ? (
    <a 
      className='btn-blue'
      href={link}
      target='_blank'
    >{text}</a>
  ) : (
    <Link href={navigateTo(link, language)}>
      <a 
        className='btn-blue'
      >{text}</a>
    </Link>
  );

  return _renderButtonLink();
}
