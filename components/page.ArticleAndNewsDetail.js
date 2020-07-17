import { PureComponent, Fragment } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import Link from 'next/link';
import { withTranslation } from '../i18n';
import axios from 'axios';

// Components
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LineShareButton,
  LineIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";
import ArticleTag from '@components/component.ArticleTag';
import Loader from '@components/component.Loader';

// Utils
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { navigateTo } from '@utils/navigation.utils';

const isServer = typeof window === 'undefined';
const WOW = !isServer ? require('wow.js') : null;

class ArticleAndNewsDetail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      shareUrl: '',
      inputName: '',
      inputComment: ''
    }
  }

  componentDidMount(){
    new WOW().init();
    this.setState({ shareUrl: window.location.href })
  } 

  _renderSection = () => {
    return (
      <div className='row'>
        <div className='col-lg-8 wow fadeIn'>
          {this._renderArticle()}
        </div>
        <div className='col-lg-4 wow fadeIn'>
          {this._renderRecentPost()}
        </div>
      </div>
    );
  };

  _renderArticle = () => {
    const { content } = this.props;
    const { title, body, image } = content;

    return  (
      <section>
        <article>
          <h1>{title}</h1>

          {this._renderArticleHeader()}

          <div className='articleBody'>
            <img className='mainImage' src={image} alt={title}/>
            {ReactHtmlParser(body)}
          </div>

          {this._renderArticleShare()}

          {this._renderComments()}
        </article>
      </section>
    );
  };

  _renderArticleHeader = () => {
    const { content, commentData, language, t } = this.props;
    const { author, createdAt, label, share } = content;
    const commentCount = commentData.length;

    moment.locale(language);
    const date = moment(createdAt).format('DD MMMM YYYY');

    return (
      <ul className='articleHeader'>
        <li>
          <span>
            {t('by')} {author} <br />
            {date}
          </span>
        </li>
        <li>
          <ArticleTag label={label}/>
        </li>
        <li>
          <span className='commentCount'>
            {commentCount} <br />
            COMMENTS
          </span>
        </li>
        <li>
          <span className='commentShare'>
            {share} <br />
            SHARES
          </span>
        </li>
      </ul>
    );
  };

  _renderArticleShare = () => {
    const { shareUrl } = this.state;
    const { content } = this.props;
    const { title } = content;

    return (
      <div className='articleShare'>
        <p>SHARE:</p>
        <ul>
          <li>
            <FacebookShareButton
              url={shareUrl}
              quote={title}
              className="fb-share"
              onShareWindowClose={this.onShareWindowClose}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </li>
          <li>
            <LinkedinShareButton 
              url={shareUrl} 
              className="in-share"
              onShareWindowClose={this.onShareWindowClose}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </li>
          <li>
            <WhatsappShareButton
              url={shareUrl}
              title={title}
              separator=":: "
              className="wa-share"
              onShareWindowClose={this.onShareWindowClose}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </li>
          <li>
            <LineShareButton
              url={shareUrl}
              title={title}
              className="line-share"
              onShareWindowClose={this.onShareWindowClose}
            >
              <LineIcon size={32} round />
            </LineShareButton>
          </li>
          <li>
            <TwitterShareButton
              url={shareUrl}
              title={title}
              className="twitter-share"
              onShareWindowClose={this.onShareWindowClose}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </li>
        </ul>
      </div>
    );
  };

  onShareWindowClose = async () => {
    const { articleId } = this.props;
    
    try {
      const url = `http://nonprod.dhealth.arinanda.com/api/v1/article/${articleId}/_share`;
      await axios.post(url);
    } catch(e) {
      console.log(e);
    }
  };

  _renderComments = () => {
    return (
      <div className='formComments'>
        {this._renderCommentList()}
        <hr/>
        {this._renderCommentForm()}
      </div>
    );
  };

  _renderCommentList = () => {
    const { commentData, t } = this.props;

    return (
      <Fragment>
        <p><b>{t('comments')}</b></p>
        {commentData.length ? (
          <ul className='formComments__list'>
          {commentData.map((item, index) => (
            <p
              key={`${item.name}_${item.comment}_${index}`}
            ><b>{item.name}</b> item.comment</p>
          ))}
        </ul>
        ) : null}
      </Fragment>
    );
  };

  _renderCommentForm = () => (
    <form onSubmit={this._submitForm}>
      <p><b>{this.props.t('leave-a-reply')}</b></p>
      <p>{this.props.t('reply-disclaimer')}</p>

      <div className="form-group">
        <textarea 
          placeholder={this.props.t('comment')}
          className="form-control" 
          id="inputComment" 
          onChange={event => this.onInputChange(event, 'inputComment')} 
          value={this.state.inputComment}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <input 
          placeholder={this.props.t('name')}
          type="text" 
          className="form-control" 
          id="inputName" 
          onChange={event => this.onInputChange(event, 'inputName')}
          value={this.state.inputName}
          required  
        />
      </div>
      {this._renderErrorMessage()}
      <button type="submit" className="btn-blue">Post Comment</button>
    </form>
  );

  _renderErrorMessage = () => this.state.isError ? (
    <div className="form-group">
      <span className='form-error'>{this.state.errorMessage}</span>
    </div>
  ) : null;

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
    }, this.fetchComment)
  };

  fetchComment = async () => {
    const { inputComment, inputName } = this.state;
    const { articleId } = this.props;
    const url = `http://nonprod.dhealth.arinanda.com/api/v1/article/${articleId}/comment`;

    let fetchFormData = new FormData();
    fetchFormData.append('name', inputName);
    fetchFormData.append('text', inputComment);

    try {
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'multipart/form-data'
        },
        data: fetchFormData,
        url
      };
      const resp = await axios(options);

      this.setState({ 
        isLoading: false,
        inputName: '',
        inputComment: ''
      }, this.refreshWindow);
    } catch(error) {
      this.setState({
        isLoading: false
      });
    }
  };

  refreshWindow = () => {
    const { shareUrl } = this.state;
    Router.reload(shareUrl);
  };

  _renderRecentPost = () => {
    const { recentPosData = [], language } = this.props;

    return (
      <div className='recentPost'>
        <p className='recentPost__title'>RECENT POST</p>

        <ul className='recentPost__list'>
          {recentPosData.map(item => {
            const { id, title } = item;
            const recentPostUrl = `article-and-news-detail?id=${id}&title=${title}`;

            return (
              <li 
                key={`${item.id}`}
                className='recentPost__list-item'
              >
                <Link href={navigateTo(recentPostUrl, language)}>
                  <a>
                    <div className='row'>
                      <div className='col-4'>
                        <img 
                          src={item.image}
                          className='recentPost__img'
                          alt={item.label}
                        />
                      </div>
                      <div className='col-8'>
                        <ArticleTag label={item.label} />
                        <p className='recentPost__list-title' title={item.title}>{item.title}</p>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  render() {
    return (
      <Fragment>
        <Head>
          <title>{this.props.content.title}</title>
          <meta name="title" content={this.props.content.title} />
          <meta name="description" content={this.props.content.body} />
        </Head>

        <div className='headerGap'>
          <section className='articleAndNewsDetail'>
            <div className='container'>
              {this._renderSection()}
            </div>

            {this.state.isLoading ? <Loader /> : null}
          </section>
        </div>
      </Fragment>
    )
  }
}

export default withTranslation('articleAndNews')(ArticleAndNewsDetail);
