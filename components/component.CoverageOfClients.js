
import { withTranslation } from '../i18n';

// Components
import Image from '@components/component.Image';

function CoverageOfClients(props) {
  return (
    <section className='CoverageOfClients'>
      <div className='container'>
        <h2 className='title'>{props.t('coverage-of-clients')}</h2>

        <div className='CoverageOfClients__maps'>
          <Image 
            src='/static/images/CoverageOfClientsMap.png'
            alt='Coverage Of Clients'
          />
        </div>
      </div>
    </section>
  )
}

export default withTranslation('common')(CoverageOfClients);
