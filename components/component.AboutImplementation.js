import React, { PureComponent } from 'react';
import { withTranslation } from '../i18n';

// Component
import Image from '@components/component.Image';

// Utils
// import ReactHtmlParser from 'react-html-parser';
import { capitalizeFirstLetter } from '@utils/string.utils';

class AboutImplementation extends PureComponent {
  state = {
    activeTabs: 0
  };

  _renderTabs = () => {
    const { content, language } = this.props;

    return (
      <ul className='aboutImplementation__tabs clearfix'>
        {content.map((item, index) => {
          const isActive = index === this.state.activeTabs ? 'active' : '';
          const titleKey = 'technology' + capitalizeFirstLetter(language);

          return (
            <li 
              className={isActive} 
              key={item[titleKey] + index}
              onClick={this.onTabClick(index)}
            >
              <div>
                <span>{item[titleKey]}</span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  onTabClick = index => () => {
    this.setState({
      activeTabs: index
    });
  };

  renderTabsContent = () => {
    const { content, language } = this.props;
    const { activeTabs } = this.state;

    return (
      <div className='fadeIn'>
        {
          content.map((tab, index) => {
            const tabClass = index === activeTabs ? 'aboutImplementation__tabs-content active' : 'aboutImplementation__tabs-content d-none';

            return (
              <div 
                id={`tab_${index}`}
                className={tabClass}
                key={`tab_${index}`}
              >
                {
                  tab.implementations.map((item, index) => {
                    const titleKey = 'title' + capitalizeFirstLetter(language);
                    const desktopImageKey = 'desktopImage' + capitalizeFirstLetter(language);

                    return (
                      <div 
                        className='aboutImplementation__tabs-content-item'
                        key={item[titleKey] + index}
                      >
                        <div className='wrapper'>
                          <Image 
                            src={item[desktopImageKey]}
                            alt={item[titleKey]}
                          />
                        </div>
                        <p>{item[titleKey]}</p>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    );
  };

  render() {
    return (
      <section className='aboutImplementation'>
        <div className='container'>
          <h2 className='aboutImplementation__title'>{this.props.t('implementations-title')}</h2>

          <div className='tab-wrapper'>
            {this._renderTabs()}
          </div>
          {this.renderTabsContent()}
        </div>
      </section>
    )
  }
}

export default withTranslation('implementations')(AboutImplementation);
