import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import imageData from './imageData.json';

const SLIDER_SPEED = 5000 // m/s
const SLIDER_FADE_IN_SPEED = 500

class ImageSlider extends Component {  
  constructor(props){
    super(props)
    this.state = {
      images: [],
      sliderImage: [],
      index: 0,
      opacity: 1
    }
    this.slideImage = this.slideImage.bind(this)
    this.startImageSlider = this.startImageSlider.bind(this)
  }
  componentDidMount(){
    //create image array from import file
    var importImages = []
    for(let i = 0; i < imageData.length; i++){
      importImages.push(imageData[i])
    }
    this.startImageSlider(importImages)
  }
  startImageSlider(images){
    this.setState({ images: images, sliderImage: images[this.state.index]}, 
    () => setInterval(this.slideImage, SLIDER_SPEED)) 
  }
  slideImage(){
     const { images, index } = this.state;
     var nextIndex = index 
     nextIndex++ //increment to next image 

     if(nextIndex === images.length){ //reset sliderImage when index reaches array length
      nextIndex = 0
     }
     //fade out current image and fade in the next image
     this.setState({ opacity: 0 }, 
      () => setTimeout(() => this.setState({ sliderImage: images[nextIndex], opacity: 1 , index: nextIndex  }), SLIDER_FADE_IN_SPEED ))
  }
  //display image slider
  render() { 
    const { images, sliderImage, opacity, index } = this.state
    return (
      <div className="image-gallery-container">
        <h1>Image Gallery</h1>
          <SliderImage
            opacityStyle = { opacity }
            sliderImage = {sliderImage }
          />
          <SliderThumbs
            images = { images }
            sliderImageId = {sliderImage.id }
          />
       </div>
    );
  }
}
//top image slider
class SliderImage extends Component {
    render(){
      const { sliderImage, opacityStyle } = this.props;
      return(
        <div className="image-container" style={{opacity: opacityStyle, transition:"opacity 1s"}}>
          <div className="selected-image-block">
            <img alt={sliderImage.title} src={ process.env.PUBLIC_URL + sliderImage.source} />
          </div>
          <p>{sliderImage.title}</p>
        </div>
        );
    }
}
//image thumbnails
class SliderThumbs extends Component {
    render() {
      const { images, sliderImageId } = this.props;
      return(
           <div className="gallery-container">
           {
              images.map(image =>
                <div className={(image.id === sliderImageId ? 'image-block image-block-selected' : 'image-block')} key={image.id}> 
                  <img alt={image.title} src={ process.env.PUBLIC_URL + image.source} />
                </div>
              )
            }
            </div>
        );
    }
}
//image slider name for DOM element 
ReactDOM.render(<ImageSlider />, document.getElementById('image-gallery'))
registerServiceWorker()

