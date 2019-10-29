# Video Doorbell, Lab 7

**yw2224@cornell.edu**

## Part A. HelloYou from the Raspberry Pi

**a. Link to a video of your HelloYou sketch running.**

[![](http://img.youtube.com/vi/0z06NqhCPYE/0.jpg)](https://youtu.be/0z06NqhCPYE)


## Part B. Web Camera

**a. Compare `helloYou/server.js` and `IDD-Fa18-Lab7/pictureServer.js`. What elements had to be added or changed to enable the web camera? (Hint: It might be good to know that there is a UNIX command called `diff` that compares files.)**

The main difference is that pictureServer.js uses NodeWebcam to control the camera and allows users to take pictures.  


**b. Include a video of your working video doorbell**

[![](http://img.youtube.com/vi/up8Ta5sO-vI/0.jpg)](https://youtu.be/up8Ta5sO-vI)

## Part C. Make it your own

**a. Find, install, and try out a node-based library and try to incorporate into your lab. Document your successes and failures (totally okay!) for your writeup. This will help others in class figure out cool new tools and capabilities.**

I integrated the @google-cloud/vision package for face detection, so the doorbell is smart enough to recognize human faces. When a visitor hit the button and take a picture, the system examines whether there are people in the picture. It won't let you pass if you don't show your face in the photo.

**b. Upload a video of your working modified project**

[![](http://img.youtube.com/vi/AsloRFvvjFk/0.jpg)](https://youtu.be/AsloRFvvjFk)
