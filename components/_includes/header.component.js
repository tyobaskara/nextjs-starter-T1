import { PureComponent } from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import find from 'lodash/find';

// Constants
import languageSelectList from '~/constants/languageSelectList';

class Header extends PureComponent {
  state = {
    isNavOpen: false,
    languageSelectList,
    language: this.props.language
  }

  _renderLogo = () => (
    <Link href='/'>
      <a className='dhealthNav-logo'>
        <img 
          src='/static/images/dhealth-logo.png' 
          srcSet='/static/images/dhealth-logo@2x.png 2x, /static/images/dhealth-logo@3x.png 3x'
        />
      </a>
    </Link>
  );

  _renderHeader = () => (
    <header className='dhealthNav'>
      {this._renderHeaderMobile()}
      {this._renderNavContainer()}
    </header>
  );

  _renderHeaderMobile = () => (
    <div className='dhealthNav-headerMobile'>
      {this._renderLogo()}
      {this._renderHamburgerBtn()}
    </div>
  );

  _renderHamburgerBtn = () => (
    <button 
      className='dhealthNav-hamburger' 
      onClick={this.onHamburgerClick}
    >
      <i className="fas fa-bars"></i>
    </button>
  );

  onHamburgerClick = () => {
    this.setState(prevState => ({
      isNavOpen: !prevState.isNavOpen
    }));
  };

  _renderNavContainer = () => {
    const { isNavOpen } = this.state;
    const containerClass = isNavOpen ? 'container show' : 'container';

    return (
      <div className={containerClass}>
        <div className='dhealthNav-left'>
          {this._renderLogo()}
        </div>

        <div className='dhealthNav-right'>
          {this._renderNavList()}
        </div>

        {this._renderLanguageToggleBtn()}
      </div>
    );
  };

  _renderNavList = () => (
    <ul className='dhealthNav-list'>
      {this.props.navList.map(item => this._renderNavListItem(item))}
    </ul>
  );

  _renderNavListItem = ({ name, route, list}) => {
    const { activeNav, language } = this.props;
    const getListClassName = name === activeNav ? ' active' : '';

    if (list.length > 0) {
      return (
        <li key={name} className={`hoverExpandList${getListClassName}`}>
          <div>
            <Link href='#'>
              <a>
                <span>{name}</span>
                <i className="fas fa-caret-down"></i>
              </a>
            </Link>
            <ul>
              {list.map(listItem => {
                return (
                  <li key={listItem.name}>
                    <Link href={`/${language}/${listItem.route}`}>
                      <a>{listItem.name}</a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </li>
      );
    }

    return (
      <li key={name} className={getListClassName}>
        <Link href={`/${language}/${route}`}>
          <a>{name}</a>
        </Link>
      </li>
    );
  };

  _renderLanguageToggleBtn = () => (
    <div className='languageToggle'>
      {this._renderSelectedLanguage()}
      {this._renderLanguageSelectList()}
    </div>
  );

  _renderSelectedLanguage = () => {
    const { languageSelectList, language } = this.state;
    const selectedLanguage = find(languageSelectList, lan => lan.value === language);

    return selectedLanguage ? (
      <div className='languageToggle-selected' key={selectedLanguage.value}>
        <img src={selectedLanguage.image} />
        <i className="fas fa-caret-down"></i>
      </div>
    ) : null;
  };

  _renderLanguageSelectList = () => {
    const { languageSelectList, language } = this.state;
    const filteredLanguageSelectList = languageSelectList.filter(lan => lan.value !== language);

    return (
      <ul className='languageToggle-list'>
        {filteredLanguageSelectList.map(list => (
          <li key={list.value}>
            <button onClick={this.onSelectLanguage(list.value)}>
              <img src={list.image} />
            </button>
          </li>
        ))}
      </ul>
    );
  };

  onSelectLanguage = language => () => {
    const { router } = this.props;
    this.setState({ language }, () => {
      const { route } = router;
      const { language } = this.state;
      
      // replace route from matches any word character between first slash character
      // ex: /en/Home -> `/${language}/Home`
      const redirectRoute = route.replace(/\/\w+\//g, `/${language}/`); 
      router.push(redirectRoute);
    });
  };

  render() {
    return this._renderHeader();
  }
}

export default withRouter(Header);
