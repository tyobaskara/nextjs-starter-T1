import ReactHtmlParser from 'react-html-parser';

//Components
import Image from '~/components/Image/Image.component';

export default function KeyFeatures() {
  return (
    <section className='KeyFeatures section-grey2'>
      <div className='container'>
        <h2 className='title'>Key Features</h2>

        <div className='KeyFeatures__web-list d-none d-sm-block'>
          <ul className='KeyFeatures__list'>
            <li className='width-20'>
              <Image 
                className='KeyFeatures__list-image'
                src='/static/images/keyfeatures-icon1.png'
                srcSet={['/static/images/keyfeatures-icon1@2x.png', '/static/images/keyfeatures-icon1@3x.png']}
              />
              <p className='KeyFeatures__list-desc'>
                {ReactHtmlParser('Easy-to-Use <br/>Electronic <br/>Medical Record')}
              </p>
            </li>

            <li className='width-20'>
              <Image 
                className='KeyFeatures__list-image'
                src='/static/images/keyfeatures-icon2.png'
                srcSet={['/static/images/keyfeatures-icon2@2x.png', '/static/images/keyfeatures-icon2@3x.png']}
              />
              <p className='KeyFeatures__list-desc'>
                {ReactHtmlParser('Constant <br/>Monitoring of <br/>Patient BPJS <br/>Insurance')}
              </p>
            </li>

            <li className='width-20'>
              <Image 
                className='KeyFeatures__list-image'
                src='/static/images/keyfeatures-icon3.png'
                srcSet={['/static/images/keyfeatures-icon3@2x.png', '/static/images/keyfeatures-icon3@3x.png']}
              />
              <p className='KeyFeatures__list-desc'>
                {ReactHtmlParser('Online Registration<br/>through Whatsapp<br/>Bot')}
              </p>
            </li>

            <li className='width-20'>
              <Image 
                className='KeyFeatures__list-image'
                src='/static/images/keyfeatures-icon4.png'
                srcSet={['/static/images/keyfeatures-icon4@2x.png', '/static/images/keyfeatures-icon4@3x.png']}
              />
              <p className='KeyFeatures__list-desc'>
                {ReactHtmlParser('Integrated<br/>Registration<br/>of e-KTP reader')}
              </p>
            </li>

            <li className='width-20'>
              <Image 
                className='KeyFeatures__list-image'
                src='/static/images/keyfeatures-icon5.png'
                srcSet={['/static/images/keyfeatures-icon5@2x.png', '/static/images/keyfeatures-icon5@3x.png']}
              />
              <p className='KeyFeatures__list-desc'>
                {ReactHtmlParser('Integrated <br/>Payment to <br/>Multiple Channels')}
              </p>
            </li>
            <li className='width-25'>
              <Image 
                className='KeyFeatures__list-image'
                src='/static/images/keyfeatures-icon1.png'
                srcSet={['/static/images/keyfeatures-icon1@2x.png', '/static/images/keyfeatures-icon1@3x.png']}
              />
              <p className='KeyFeatures__list-desc'>
                {ReactHtmlParser('Connected System <br/>with BPJS (V-Claim <br/>to INACBGs)')}
              </p>
            </li>

            <li className='width-25'>
              <Image 
                className='KeyFeatures__list-image'
                src='/static/images/keyfeatures-icon1.png'
                srcSet={['/static/images/keyfeatures-icon1@2x.png', '/static/images/keyfeatures-icon1@3x.png']}
              />
              <p className='KeyFeatures__list-desc'>
                {ReactHtmlParser('Connected Prescription <br/>System between Doctors and Pharmacy')}
              </p>
            </li>

            <li className='width-25'>
              <Image 
                className='KeyFeatures__list-image'
                src='/static/images/keyfeatures-icon1.png'
                srcSet={['/static/images/keyfeatures-icon1@2x.png', '/static/images/keyfeatures-icon1@3x.png']}
              />
              <p className='KeyFeatures__list-desc'>
                {ReactHtmlParser('Intuitive Interfaces Apps <br/>for Simple Interaction')}
              </p>
            </li>

            <li className='width-25'>
              <Image 
                className='KeyFeatures__list-image'
                src='/static/images/keyfeatures-icon9.png'
                srcSet={['/static/images/keyfeatures-icon9@2x.png', '/static/images/keyfeatures-icon9@3x.png']}
              />
              <p className='KeyFeatures__list-desc'>
                {ReactHtmlParser('Brand New Look <br/>Kios-K')}
              </p>
            </li>
          </ul>
        </div>
        
      </div>   
    </section>
  )
}
