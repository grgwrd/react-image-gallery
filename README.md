<h1>Simple Image Slider with React JS</h1>

<p>
This application is using React JS components that include one parent class, <strong>ImageSlider</strong>, and two child classes,<strong> SliderImage</strong> and <strong>SliderThumbs</strong>. When the application is running an image for the image slider is displayed along with a list of thumbmail images for each image. Each image is displayed for five seconds with the matching thumbnail image highlighted. After the five seconds the image fades out and replaced with the next image fading in on the list. This process repeats after going through each image on the thumbnail list.</p>

<h2>How it all works</h2>
<p>
To know how this application works, its good to know a little about React JS, more specifically <a href="https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html">Facebooks's create-react-app package library</a>. If you haven't ever used or heard of React. I recommend visiting their site or reading up on how React works for understanding the code behind this repo.</p>  

<p>Now that you know everything about React.... This application is pretty simple. I will break it down based on the classes and functions used.</p>

<h3>ImageSlider</h3>
<p>
This is the parent class with a constructor method that declares the variables used with the image slider. It uses one lifecyle function, componentDidMount, that is triggered as soon as the screen is rendered. This function creates an array from an imported JSON file for the image data and then the startImageSlider function is called.</p> 

<p>startImageSlider is where setState is called for first time and the image source and opacity are set to display the image. When setState is called there is a callback function used to setInterval that will be called for every x amount of seconds to call the function to slide the image, named slideImage.</p>
<p>
When slideImage is called the current state is looked at in the constructor method for the index. The index is incremented to the next image on the image array to set the state for the next image on the slider. When setState is called the opacity is set to 0 on the current image being displayed to fade out the image. Then the callback function on setState calls an anonymous function to setTimeout for half a second. After half a second setState is called again to set opacity to 1 and fade in the next image on image array index for the image slider.</p>

<h3>SliderImage</h3>
<p>A child class that displays the selected image for the image slider. This is where the image source, image title and opacity is set to change the images and styles during the image slider effect.</p>

<h3>SliderThumbs</h3>
<p>A child class that displays the image thumbs for the image slider. It takes the array of images and uses a map function to diplay the content to the screen. The class name is changed on the div element based on the image id matching with the selected image on the SliderImage. The class changes to highlight which image is being displayed on the slider image array.</p> 


