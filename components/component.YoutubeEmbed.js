import { PureComponent } from 'react'

// Components
import Image from '@components/component.Image';

export default class YoutubeEmbed extends PureComponent {
  state = {
    isShow: false
  }

  getClassName = () => {
    const { className = '' } = this.props;

    return className ? `youtubeEmbed ${className}` : 'youtubeEmbed';
  };

  _renderBtn = () => {
    const { isShow } = this.state;
    const { youtubeId } = this.props;
    const src = `http://i3.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

    return !isShow ? (
      <button onClick={this.onBtnClick}>
        <Image 
          src={src}
        />
      </button>
    ) : null;
  };

  _renderIframe = () => {
    const { isShow } = this.state;
    const { youtubeId } = this.props;
    const src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`

    return isShow ? (
      <iframe 
        src={src} 
        frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    ) : null;
  };

  onBtnClick = () => {
    this.setState(prevState => ({
      isShow: !prevState.isShow
    }));
  };

  render() {
    return (
      <div className={this.getClassName()}>
        {this._renderBtn()}
        {this._renderIframe()}
      </div>
    )
  }
}
