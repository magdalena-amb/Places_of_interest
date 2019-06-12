
'use strict';

{

 //Mustache templates 
 var imageList = document.getElementById('image-list');
 var imageItem = document.getElementById('template-image').innerHTML;

Mustache.parse(imageItem);

var imageListHTML = '';

for (var i=0; i < imageData.length; i++ ){
 //console.log(imageData);
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


// Google map and markers

// var infos = document.getElementById('infos');

  var map; // zmienna globalna przechowująca obiekt mapy
  var markers = []; // w tej tablicy przechowujemy markery

  function addMarker(title, latlng, cellNum) {
      var marker = new google.maps.Marker({
          title: title, 
          position: latlng,
          map: map // map to zmienna do naszej mapy
      });
      marker.addListener('click', function(){
        flkty.selectCell(cellNum);
      });
      // marker.addListener('click', function(){
      //   infos.innerHTML = 'You clicked ' + title;
      // });

      // przechowuje utworzone markery w naszej tablicy
      markers.push(marker);
  }
  var domMap = document.getElementById('map');

  flkty.on( 'change', function( index ) {
    var place = imageData[index].coords;
    // Najpierw wykorzystujemy metodę panTo w obiekcie map do przesunięcia współrzędnych mapy:
      map.panTo(place);
			// A następnie zmieniamy powiększenie mapy:
			map.setZoom(8);
  });

  window.initMap = function() {
    
      map = new google.maps.Map(domMap, {
          //ustawiamy pozycję, w której ma znajdować się środek mapy
          center: imageData[0].coords,
          //ustawiamy przybliżenie mapy
          zoom: 5
      });

      for (var i = 0; i < imageData.length; i++){
       addMarker(imageData[i].id, imageData[i].coords, i);	
      }

  }
  
}
 