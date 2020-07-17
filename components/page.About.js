import React, { PureComponent } from 'react';

// Components
import AboutChallenge from '@components/component.AboutChallenge';
import AboutSlider from '@components/component.AboutSlider';
import AboutSolution from '@components/component.AboutSolution';
// import AboutSolutionItem from '@components/component.AboutSolutionItem';
import AboutVisionMission from '@components/component.AboutVisionMission';
import AboutSmartHospital from '@components/component.AboutSmartHospital';
import AboutImplementation from '@components/component.AboutImplementation';

const isServer = typeof window === 'undefined';
const WOW = !isServer ? require('wow.js') : null;

export default class About extends PureComponent {
  componentDidMount() {
    new WOW().init();
  }

  render() {
    const { language, content } = this.props;

    return (
      <div className='headerGap'>
        <div className='wow fadeIn'>
          <AboutChallenge 
            language={language}
            content={content.section1}
          />
        </div>
        <div className='wow fadeIn'>
          <AboutSlider 
            language={language}
            content={content.section2}
          />
        </div>
        <div className='wow fadeIn'>
          <AboutSolution 
            language={language}
            content={content.section3}
          />
        </div>
        {/* <AboutSolutionItem 
          language={language}
        /> */}
        <div className='wow fadeIn'>
          <AboutVisionMission 
            language={language}
            content={content.section4}
          />
        </div>
        <div className='wow fadeIn'>
          <AboutSmartHospital 
            language={language}
            content={content.section5}
          />
        </div>
        <div className='wow fadeIn'>
          <AboutImplementation 
            language={language}
            content={content.section6}
          />
        </div>
      </div>
    )
  }
}
