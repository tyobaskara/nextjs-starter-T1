import { PureComponent, Fragment } from 'react';
import { withTranslation } from '../i18n';
import axios from 'axios';

// Components
import YoutubeEmbed from '@components/YoutubeEmbed.component';
import Loader from '@components/Loader.component';

// Utils
import { capitalizeFirstLetter } from '@utils/string.utils';

class Testimonial extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pageNumber: 1,
      pageSize: 3,
      isLoading: false,
      isNoMoreList: false,
      content: props.content
    }
  }

  _renderPageTitle = () => (
    <Fragment>
      <h1 className='title'>Testimonial</h1>
      <h2>{this.props.t('testimonial-subtitle')}</h2>
    </Fragment>
  );

  _renderTestimonialList = () => {
    const { content } = this.state;

    return (
      <ul className='testimonial-list'>
        {content.map(item => this._renderTestimonialItem(item))}
      </ul>
    );
  };

  _renderTestimonialItem = (item) => {
    const { id, job, name, photo, video } = item;
    const { language } = this.props;
    const lang = capitalizeFirstLetter(language);
    const problemText = `problem` + lang;
    const solutionText = `solution` + lang;
    const quotationText = `quotation` + lang;

    return (
      <li key={id}>
        <div className='wrapper-1'>
          <div className='row'>
            <div className='col-lg-6 left'>
              <div className='avatar'>
                <img className='avatar-image' src={photo} />
                <div className='avatar-desc'>
                  <p className='avatar-desc__name'>{name}</p>
                  <p className='avatar-desc__title'>{job}</p>
                </div>
              </div>
              <div>
                <YoutubeEmbed 
                  className='youtube-embed'
                  youtubeId={video}
                />
                {/* <img className='quote-top' src='/static/images/quote-top.png' /> */}
              </div>
            </div>
            <div className='col-lg-6 right'>
              <div className='problem-solution'>
                <p><b>Problem</b>: {item[problemText]}</p>
                <p><b>Solution</b>: {item[solutionText]}</p>
              </div>
              <div className='quote'>
                <img className='quote-top' src='/static/images/quote-top.png' />
                <p>{item[quotationText]}</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  };

  _renderButtonMore = () => {
    const { t } = this.props;
    const { isNoMoreList } = this.state;

    return isNoMoreList ? (
      <div className='testimonial-load-more'>
        <p>{t('no-more-data')}</p>
      </div> 
    ) : (
      <div className='testimonial-load-more'>
        <button className='btn-blue' onClick={this._onLoadMore}>{t('see-more')}</button>
      </div>
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
    
    try {
      const url = `http://nonprod.dhealth.arinanda.com/api/v1/testimonial?pageNumber=${pageNumber}&pageSize=${pageSize}`;
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
      <section className='testimonial'>
        <div className='container'>
          {this._renderPageTitle()}
          {this._renderTestimonialList()}
          {this._renderButtonMore()}
        </div>

        {this.state.isLoading ? <Loader /> : null}
      </section>
    )
  }
}

export default withTranslation('testimonial')(Testimonial);
