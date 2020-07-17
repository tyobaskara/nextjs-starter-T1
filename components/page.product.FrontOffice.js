import { PureComponent } from 'react';
import Link from 'next/link';

// Components
import Image from '@components/component.Image';

// Utils
import { capitalizeFirstLetter } from '@utils/string.utils';

const isServer = typeof window === 'undefined';
const WOW = !isServer ? require('wow.js') : null;

export default class FrontOffice extends PureComponent {
  constructor(props){
    super(props);

    this.state = {
      content: props.content.items,
      activeIndex: 0
    }
  }

  componentDidMount() {
    new WOW().init();
  }

  _renderProductLeft = () => {
    const { language } = this.props;

    return (
      <div className='product-left'>
        <ul>
          <li className='active'>
            <Link href={`/${language}/product-front-office`}>
              <a>
                <span className='product-icon front-office'></span>
                <span className='name'>Front Office</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/${language}/product-back-office`}>
              <a>
                <span className='product-icon back-office'></span>
                <span className='name'>Back Office</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/${language}/product-service-1`}>
              <a>
                <span className='product-icon service-1'></span>
                <span className='name'>Service 1</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/${language}/product-service-2`}>
              <a>
                <span className='product-icon service-2'></span>
                <span className='name'>Service 2</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/${language}/product-information`}>
              <a>
                <span className='product-icon information'></span>
                <span className='name'>Information</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  _renderProductRight = () => {
    const { language } = this.props;
    const { content = [], activeIndex } = this.state;
    const activeContent = content[activeIndex];
    const titleKey = 'title' + capitalizeFirstLetter(language);
    const descriptionKey = 'description' + capitalizeFirstLetter(language);
    const featuresKey = 'features' + capitalizeFirstLetter(language);

    return content.length > 0 ? (
      <div className='product-right'>
        <div className='product-head'>
          <h1>{activeContent[titleKey]}</h1>
          <Image src={activeContent.icon} alt={activeContent[titleKey]} />
        </div>

        <div className='product-body'>
          <p>{activeContent[descriptionKey]}</p>

          <div className='product-icon-list front-office'>
            <div className='wrapper'>
              {this._renderIconList()}
              <Image 
                className="product-icon-list__main"
                src='/static/images/frontOffice-queuing.jpg'
                alt='dhealth front office'
              />
            </div>
          </div>

          {this._renderProductBodyFeature(activeContent[featuresKey])}
        </div>
      </div>
    ) : null;
  };

  _renderIconList = () => {
    const { language } = this.props;
    const { content = [], activeIndex } = this.state;
    const titleKey = 'title' + capitalizeFirstLetter(language);

    return (
      <ul>
        {content.map((list, index) => {
          const getActiveClass = index === activeIndex ? 'active' : '';
          const listIndexClass = `product-icon-list-${index}`;
          const listClass = `${listIndexClass} ${getActiveClass}`;

          return (
            <li className={listClass} key={list[titleKey]}>
              <button onClick={this.onIconClick(index)}>
                <Image src={list.icon} alt={list[titleKey]} />
                <span>{list[titleKey]}</span>
              </button>
            </li>
          );
        })}
      </ul>
    );
  };
  
  onIconClick = (index) => () => {
    this.setState({ activeIndex: index }, () => {
      window.scrollTo(0, 0);
    });
  };

  _renderProductBodyFeature = (featureList) => (
    <div className='product-body-feature'>
      <h2>Features:</h2>
      <ul>
        {featureList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );

  render() {
    return (
      <section className='product headerGap wow fadeIn'>
        <div className='container'>
          <div className='product-wrap clearfix'>
            {this._renderProductLeft()}
            {this._renderProductRight()}            
          </div>
        </div>
      </section>
    )
  }
}
