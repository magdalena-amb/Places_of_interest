'use strict';
(function(){ 

  //Mustache templates 
  var imageList = document.getElementById('image-list');
  var imageItem = document.getElementById('template-image').innerHTML;

Mustache.parse(imageItem);

var imageListHTML = '';

for (var i=0; i < imageData.length; i++ ){
  console.log(imageData);
  imageListHTML += Mustache.render(imageItem, imageData[i]);
}

imageList.insertAdjacentHTML('beforeend', imageListHTML);

// Flickity carousel
var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  //hash.js script added for this to work
  hash: true 
});

//restart button
document.querySelector('.restart').addEventListener('click', function(){
  flkty.selectCell(0);
});
//progress bar
var progressBar = document.querySelector('.progress-bar');
flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});

})();