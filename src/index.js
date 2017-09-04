import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import imageData from './imageData.json';

const SLIDER_DISPLAY = 5000 
const SLIDER_FADE_IN = 500

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
    //create image array from imported file
    var importImages = []
    for(let i = 0; i < imageData.length; i++){
      importImages.push(imageData[i])
    }
    this.startImageSlider(importImages)
  }
  startImageSlider(images){
    //set images and start image slider
    this.setState({ images: images, sliderImage: images[this.state.index]}, 
    () => setInterval(this.slideImage, SLIDER_DISPLAY)) 
  }
  slideImage(){
     const { images, index } = this.state;
     //increment to next image 
     var nextIndex = index 
     nextIndex++ 
     //reset image slider when index reaches array length
     if(nextIndex === images.length){ 
      nextIndex = 0
     }
     //fade out current image and fade in the next image
     this.setState({ opacity: 0 }, 
      () => setTimeout(() => this.setState({ sliderImage: images[nextIndex], opacity: 1 , index: nextIndex  }), SLIDER_FADE_IN ))
  }
  //display image slider
  render() { 
    const { images, sliderImage, opacity, index } = this.state
    return (
      <div className="image-slider-container">
        <h1>Image Slider</h1>
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
//image slider
class SliderImage extends Component {
    render(){
      const { sliderImage, opacityStyle } = this.props;
      return(
        <div className="image-container" style={{opacity: opacityStyle, transition:"opacity 1s"}}>
          <div className="selected-image-block">
            <img alt={sliderImage.title} src={ process.env.PUBLIC_URL + sliderImage.source} />
          </div>
        </div>
        );
    }
}
//image slider thumbnails
class SliderThumbs extends Component {
    render() {
      const { images, sliderImageId } = this.props;
      return(
           <div className="slider-container">
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
ReactDOM.render(<ImageSlider />, document.getElementById('image-slider'))
registerServiceWorker()

