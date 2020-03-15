import React from 'react';
import './ExploreContainer.css';

export class ExploreContainer extends React.Component {

  constructor(public props: any) {
    super(props)
  }

  render() {
    return (
      <div className="container">
        <strong>Ready to create an app?</strong>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div>
    )
  }

}

export default ExploreContainer;
