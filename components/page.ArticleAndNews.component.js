import { PureComponent } from 'react';
import { withTranslation } from '../i18n';
import axios from 'axios';

// Components
import ArticleCard from '@components/ArticleCard.component';
import Loader from '@components/Loader.component';

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

  _renderFormSearch = () => (
    <form className='form-search' onSubmit={this._submitForm}>
      <div className="form-group">
        <input 
          type="text" 
          className="form-control" 
          id="inputSearch" 
          onChange={event => this.onInputChange(event, 'inputSearch')} 
          value={this.state.inputSearch}
          placeholder='Search...'
        />
      </div>

      <button type="submit">
        <img src='/static/images/magnifier.png'/>
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
      isLoading: true
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
        {content.map(item => (
          <li key={item.id}>
            <ArticleCard 
              language={language}
              content={item}
              btnLink={`article-and-news-detail?id=${item.id}&title=${item.title}`}
            />
          </li>
        ))}
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
      <section className='articleAndNews'>
        <div className='container'>
          <h1 className='title'>Article &amp; News</h1>
          
          {this._renderFormSearch()}
          {this._renderList()}
          {this._renderButtonMore()}
        </div>

        {this.state.isLoading ? <Loader /> : null}
      </section>
    )
  }
}

export default withTranslation('articleAndNews')(ArticleAndNews);
