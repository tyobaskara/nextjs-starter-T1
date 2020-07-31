import Link from 'next/link';
import moment from 'moment';
import { withTranslation } from '../i18n';

// Components
import ArticleTag from '@components/component.ArticleTag';
import Image from '@components/component.Image';

// Utils
import { navigateTo } from '@utils/navigation.utils';

function ArticleCard(props) {
  const { language, content, btnName, btnLink, t } = props;
  const { author, createdAt, image, label, title } = content;
  
  moment.locale(language);
  const createdDate = moment(createdAt).format("DD MMM YYYY");
  const articleClass = btnName ? 'articleCard hasBtn' : 'articleCard';

  const _renderBtn = () => {
    return btnName ? (
      <div className='articleCard__btn'>
        <button className='btn-blue'>{btnName}</button>
      </div>
    ) : null;
  };

  return (
    <Link href={navigateTo(btnLink, language)}>
      <a className={articleClass}>
        <div className='articleCard__top'>
          <Image src={image} alt={title}/>
          <ArticleTag label={label} />
        </div>

        <div className='articleCard-content'>
          <h3
            title={title}
          >{title}</h3>
          <p>{t('by')} {author} |  {createdDate}</p>
        </div>

        {_renderBtn()}
      </a>
    </Link>
  );
}

export default withTranslation('articleAndNews')(ArticleCard);