import React, { PureComponent } from 'react';

// Components
import AboutChallenge from '@components/AboutChallenge.component';
import AboutSlider from '@components/AboutSlider.component';
import AboutSolution from '@components/AboutSolution.component';
// import AboutSolutionItem from '@components/AboutSolutionItem.component';
import AboutVisionMission from '@components/AboutVisionMission.component';
import AboutSmartHospital from '@components/AboutSmartHospital.component';
import AboutImplementation from '@components/AboutImplementation.component';

export default class About extends PureComponent {
  render() {
    const { language, content } = this.props;

    return (
      <div>
        <AboutChallenge 
          language={language}
          content={content.section1}
        />
        <AboutSlider 
          language={language}
          content={content.section2}
        />
        <AboutSolution 
          language={language}
          content={content.section3}
        />
        {/* <AboutSolutionItem 
          language={language}
        /> */}
        <AboutVisionMission 
          language={language}
          content={content.section4}
        />
        <AboutSmartHospital 
          language={language}
          content={content.section5}
        />
        <AboutImplementation 
          language={language}
          content={content.section6}
        />
      </div>
    )
  }
}
