import { PureComponent } from 'react';
import { withTranslation } from '../i18n';
import axios from 'axios';

// Components
import ArticleCard from '@components/component.ArticleCard';
import Loader from '@components/component.Loader';

const isServer = typeof window === 'undefined';
const WOW = !isServer ? require('wow.js') : null;

class ArticleAndNews extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pageNumber: 1,
      pageSize: 9,
      isLoading: false,
      inputSearch: '',
      content: props.content
    }
  }

  componentDidMount() {
    new WOW().init();
  }

  _renderFormSearch = () => (
    <form className='form-search' onSubmit={this._submitForm}>
      <div className="form-group">
        <input 
          type="text" 
          className="form-control" 
          id="inputSearch" 
          onChange={event => this.onInputChange(event, 'inputSearch')} 
          value={this.state.inputSearch}
          placeholder={this.props.t('search')}
        />
      </div>

      <button type="submit">
        <img src='/static/images/magnifier.png' alt='search'/>
      </button>
    </form>
  );

  onInputChange = (event, stateName) => {
    const { value } = event.target;

    this.setState({
      [stateName]: value,
      isError: false
    });
  };

  _submitForm = (event) => {
    event.preventDefault();

    this.setState({
      isLoading: true,
      isError: false
    }, this.fetchSearch);
  };

  fetchSearch = async () => {
    const { inputSearch } = this.state;
    const { language } = this.props;

    try {
      const url = `http://nonprod.dhealth.arinanda.com/api/v1/article?language=${language}&searchKey=${inputSearch}&pageNumber=1&pageSize=9`;
      const { data: { data } } = await axios.get(url);

      this.setState({
        isLoading: false,
        content: data,
        isNoMoreList: false
      });
    } catch(error) {
      this.setState({
        isLoading: false
      });
    }
  };

  _renderList = () => {
    const { content } = this.state;
    const { language } = this.props;

    return (
      <ul className='articleAndNews__list'>
        {content.map(item => {
          const { label, id } = item;
          const type = label.toLowerCase();
          const title = item.title.split(' ').join('-');

          return (
            <li key={item.id}>
              <ArticleCard 
                language={language}
                content={item}
                btnLink={`${type}/${id}/${title}`}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  _renderButtonMore = () => {
    const { t } = this.props;
    const { isNoMoreList } = this.state;

    return isNoMoreList ? (
      <p className='text-center'>{t('no-more-data')}</p>
    ) : (
      <button className='btn-blue explore' onClick={this._onLoadMore}>{t('see-more')}</button>
    );
  };

  _onLoadMore = () => {
    this.setState(prevState => ({
      isLoading: true,
      pageNumber: prevState.pageNumber + 1
    }), this._fetchLoadMore);
  };

  _fetchLoadMore = async () => {
    const { pageNumber, pageSize, content } = this.state;
    const { language } = this.props;
    
    try {
      const url = `http://nonprod.dhealth.arinanda.com/api/v1/article?language=${language}&searchKey=${inputSearch}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
      const { data: { data } } = await axios.get(url);
      const isNoMoreList = data.length > 0 ? false : true;
      const newContent = [...content].concat(data);

      this.setState({
        isLoading: false,
        isNoMoreList,
        content: newContent
      });
    } catch (error) {
      this.setState(prevState => ({
        isLoading: false,
        pageNumber: prevState.pageNumber - 1
      }));
    }
  };

  render() {
    return (
      <div className='headerGap'>
        <section className='articleAndNews'>
          <div className='container'>
            <div className='wow fadeIn'>
              <h1 className='title'>{this.props.t('h1-title')}</h1>
            </div>
            
            <div className='wow fadeIn'>
              {this._renderFormSearch()}
            </div>
            <div className='wow fadeIn'>
              {this._renderList()}
            </div>
            <div className='wow fadeIn'>
              {this._renderButtonMore()}
            </div>
          </div>

          {this.state.isLoading ? <Loader /> : null}
        </section>
      </div>
    )
  }
}

export default withTranslation('articleAndNews')(ArticleAndNews);
