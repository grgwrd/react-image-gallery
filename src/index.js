import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import imageData from './imageData.json';


class App extends Component {
  
  constructor(props){
    super(props)

    this.state = {
      images: []
    }
  }

  componentWillMount(){

    let imageA = []

    for(let i = 0; i < imageData.length; i++){
      imageA.push(imageData[i])
    }
    
    this.setState({ images: imageA })

  }

  render() {

    const { images } = this.state

    return (
      <div className="wrapper">
        <div className="image-container">
          <h1>Image Gallery</h1>
          <p>
          Click on an image to view.
          </p>
           {
              images.map(image =>
                <div className="image-block" key={image.id}> 
                <img alt={image.title} src={ process.env.PUBLIC_URL + image.source} />
                <p>{image.title}</p>
                </div>
                )
            }
             </div>
          </div>
    );
  }
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
