import { withTranslation } from '../i18n';

// Utils
import ReactHtmlParser from 'react-html-parser';
import { capitalizeFirstLetter } from '@utils/string.utils';
import { Fragment } from 'react';

function AboutVisionMission(props) {
  const _renderTitle = () => (
    <h3 className='title'>{props.t('vision-mission-title')}</h3>
  );

  const _renderVision = () => {
    const { content, language, t } = props;
    const visionKey = 'vision' + capitalizeFirstLetter(language);

    return (
      <Fragment>
        <h2>{t('vision-title')}</h2>
        <p>{ReactHtmlParser(content[visionKey])}</p>
      </Fragment>
    );
  };

  const _renderMision = () => {
    const { content, language, t } = props;
    const missionKey = 'mission' + capitalizeFirstLetter(language);

    return (
      <Fragment>
        <h2>{t('mission-title')}</h2>
        <p>{ReactHtmlParser(content[missionKey])}</p>
      </Fragment>
    );
  };
  
  return (
    <section className='aboutVisionMission'>
      <div className='container'>
        {_renderTitle()}
      </div>

      <div
        className='aboutVisionMission__bg'
        style={{backgroundImage: 'url(/static/images/vision-mission.png)'}}
      >
        <div className='container'>
          <div 
            className='aboutVisionMission__content'
          >
            {_renderVision()}
            {_renderMision()}
          </div>
        </div>
      </div>
    </section>
  );
}

export default withTranslation('visionmission')(AboutVisionMission);
