import { PureComponent } from 'react';
import Link from 'next/link';

// Components
import Image from '@components/component.Image';

// Utils
import { capitalizeFirstLetter } from '@utils/string.utils';
import ReactHtmlParser from 'react-html-parser';

const isServer = typeof window === 'undefined';
const WOW = !isServer ? require('wow.js') : null;

export default class BackOffice extends PureComponent {
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
    const { language, name, products = [] } = this.props;
    const titleKey = 'title' + capitalizeFirstLetter(language);

    return (
      <div className='product-left'>
        <ul>
          <li className={name === 'front-office' ? 'active' : ''}>
            <Link href={`/${language}/product-front-office`}>
              <a>
                <img 
                  className='product-icon'
                  src={products[0].icon}
                  alt={products[0][titleKey]}
                />
                <span className='name'>{products[0][titleKey]}</span>
              </a>
            </Link>
          </li>
          <li className={name === 'back-office' ? 'active' : ''}>
            <Link href={`/${language}/product-back-office`}>
              <a>
                <img 
                  className='product-icon'
                  src={products[1].icon}
                  alt={products[1][titleKey]}
                />
                <span className='name'>{products[1][titleKey]}</span>
              </a>
            </Link>
          </li>
          <li className={name === 'service-1' ? 'active' : ''}>
            <Link href={`/${language}/product-service-1`}>
              <a>
                <img 
                  className='product-icon'
                  src={products[2].icon}
                  alt={products[2][titleKey]}
                />
                <span className='name'>{products[2][titleKey]}</span>
              </a>
            </Link>
          </li>
          <li className={name === 'service-2' ? 'active' : ''}>
            <Link href={`/${language}/product-service-2`}>
              <a>
                <img 
                  className='product-icon'
                  src={products[3].icon}
                  alt={products[3][titleKey]}
                />
                <span className='name'>{products[3][titleKey]}</span>
              </a>
            </Link>
          </li>
          <li className={name === 'information' ? 'active' : ''}>
            <Link href={`/${language}/product-information`}>
              <a>
                <img 
                  className='product-icon'
                  src={products[4].icon}
                  alt={products[4][titleKey]}
                />
                <span className='name'>{products[4][titleKey]}</span>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  _renderProductRight = () => {
    const { language, name, iconListBg, iconListAlt } = this.props;
    const { content = [], activeIndex } = this.state;
    const activeContent = content[activeIndex];
    const titleKey = 'title' + capitalizeFirstLetter(language);
    const descriptionKey = 'description' + capitalizeFirstLetter(language);
    const featuresKey = 'features' + capitalizeFirstLetter(language);

    return content.length > 0 ? (
      <div className='product-right'>
        <div className='product-head'>
          <h1>{ReactHtmlParser(activeContent[titleKey])}</h1>
          <Image src={activeContent.icon} alt={activeContent[titleKey]}/>
        </div>

        <div className='product-body'>
          <p>{ReactHtmlParser(activeContent[descriptionKey])}</p>

          <div className={`product-icon-list ${name}`}>
            <div className='wrapper'>
              {this._renderIconList()}
              <Image 
                className="product-icon-list__main"
                src={iconListBg}
                alt={iconListAlt}
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
                <Image src={list.icon} alt={list[titleKey]}/>
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

  _renderProductBodyFeature = (content) => (
    <div className='product-body-feature editor-content'>
      <div>{ReactHtmlParser(content)}</div>
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
