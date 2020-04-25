// Components
import Image from '~/components/Image/Image.component';

export default function CoverageOfClients() {
  return (
    <section className='CoverageOfClients'>
      <div className='container'>
        <h2 className='title'>Coverage Of Clients</h2>

        <div className='CoverageOfClients__maps'>
          <Image 
            src='/static/images/CoverageOfClientsMap.png'
          />
        </div>
      </div>
    </section>
  )
}
