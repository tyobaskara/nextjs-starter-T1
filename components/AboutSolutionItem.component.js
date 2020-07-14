import React, { PureComponent } from 'react';

// Component
import Image from '@components/Image.component';

export default class AboutSolutionItem extends PureComponent {
  render() {
    return (
      <section className='aboutSolutionItem'>
        <div className='container'>
          <Image 
            src='/static/images/about-solution.png'
          />

          <div className='aboutSolutionItem-1'>
            <p className='aboutSolutionItem__title'>Well-designed Solution:</p>
            <p className='aboutSolutionItem__desc'>Designed using top-down approach, from business capabilities to system functionality.</p>
          </div>
          <div className='aboutSolutionItem-2'>
            <p className='aboutSolutionItem__title'>Highly Standardized:</p>
            <p className='aboutSolutionItem__desc'>Fulfilling the high standard of KARS., both in administration recording and patient data representation.</p>
          </div>
          <div className='aboutSolutionItem-3'>
            <p className='aboutSolutionItem__title'>User Friendly:</p>
            <p className='aboutSolutionItem__desc'>Optimal user interface that creates simplicity and ease-of-use for doctor, nurse, and hospital management.</p>
          </div>
          <div className='aboutSolutionItem-4'>
            <p className='aboutSolutionItem__title'>Flexibly Interoperable:</p>
            <p className='aboutSolutionItem__desc'>Able to manage all data growth, modules and features addition, without decreasing system productivity.</p>
          </div>
        </div>
      </section>
    )
  }
}
