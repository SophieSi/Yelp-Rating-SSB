/**
 * Created by sophiasi on 4/24/17.
 */
function initMap(_ids,_info, _data,_colorScale) {
    // console.log(data);
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 36.169941, lng: -115.13983}
    });

    // console.log(_info);

    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(_info),
        map: map
    });

    // Center to las vegas
    // var geocoder = new google.maps.Geocoder;
    // geocoder.geocode({'address': 'las vegas'}, function(results, status) {
    //     if (status === 'OK') {
    //         map.setCenter(results[0].geometry.location);
    //         new google.maps.Marker({
    //             map: map,
    //             position: results[0].geometry.location
    //         });
    //     } else {
    //         window.alert('Geocode was not successful for the following reason: ' +
    //             status);
    //     }
    // });

   // var lv_border_points, lv_border;
   //  d3.json('data/lv_border.json', function (error, d) {
   //      lv_border_points = d;
   //
   //      if (lv_border_points) {
   //          // console.log(lv_border_points);
   //          lv_border = new google.maps.Polyline({
   //              path: lv_border_points,
   //              // path: [{lat: 36.169941, lng: -115.13983}, {lat: 18.291, lng: 153.027}],
   //              geodesic: true,
   //              strokeColor: '#FF0000',
   //              strokeOpacity: 1.0,
   //              strokeWeight: 2
   //          });
   //          if (lv_border){
   //              // console.log(lv_border);
   //              lv_border.setMap(map);
   //          }
   //
   //      }
   //  })





    //click marker add dom
    // google.maps.event.addListener(marker, 'click', function (marker, i) {
    //     if ($('#info-container').css('display') == 'block') {
    //         $('#info-container').css('display', 'none');
    //     } else {
    //         $('#info-container').css('display', 'block');
    //     }
    // });

    console.log(_data);
    _info.forEach(function (d,i) {
        // console.log(id);
        // console.log(d.value);
        createMarker(d.value,_data[i], map, _colorScale);
    });


    // marker.addListener('click', function() {
    //     infowindow.open(map, markers);
    // });


    // google.maps.event.addListener(markers, 'click', function() {
    //     infowindow.setContent(place.name);
    //     infowindow.open(map, this);
    // });


    // var cave =  $.jStorage.get(key);
    // var geojson = JSON.parse(cave);
    // map.data.loadJson('data/location.json');
    //
    // map.data.setStyle(function(feature) {
    //     var magnitude = feature.getProperty('mag');
    //     return {
    //         icon: getCircle(magnitude)
    //     };
    // });

    // Add a marker clusterer to manage the markers.
    // var markerCluster = new MarkerClusterer(map, markers,
    //     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}

// function getCircle(magnitude) {
//     return {
//         path: google.maps.SymbolPath.CIRCLE,
//         fillColor: 'red',
//         fillOpacity: .2,
//         scale: Math.pow(2, magnitude) / 2,
//         strokeColor: 'white',
//         strokeWeight: .5
//     };
// }

// function eqfeed_callback(results) {
//     map.data.addGeoJson(results);
// }

function getPoints(_info) {
    var points = info.map(function (d) {
        return new google.maps.LatLng(d.value.lat,d.value.lng)
    } );

    return points;
}

function rgb2hex(rgb){
    rgb = rgb.match(/^rgb?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ?
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function createMarker(_info,_data, map, _colorScale) {
    // console.log(place);

    // console.log(rgb2hex(_colorScale(_info.em_star)));
    // var pinColor = "FE7569";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_spin&chld="
        + "0.65"
        + "|0|"
        + rgb2hex(_colorScale(_info.em_star))
        + "|13|"
        + "_|"
        + (Math.round(_info.em_star * 10) / 10).toString(),
        new google.maps.Size(28, 44),// This marker is 20 pixels wide by 32 pixels high.
        new google.maps.Point(0,0),// The origin for this image is (0, 0).
        new google.maps.Point(14, 44));// The anchor for this image is the base of the flagpole at (0, 35).


    // console.log(Math.round(_info.em_star * 100) / 100);
    var marker = new google.maps.Marker({
        map: map,
        // icon: place.icon,
        position: _info,
        title: _info.name,
        id:_info.id,
        // label: (Math.round(_info.em_star * 10) / 10).toString(),
        icon: pinImage,
        // shadow: pinShadow

    });

    var infowindow = new google.maps.InfoWindow({
        content: _info.name
    });

    google.maps.event.addListener(marker, 'click', function() {
        // infowindow.setContent(place.name);
        infowindow.open(map, this);
        // console.log(marker.id);
        createVis(marker.id,_info,_data);
    });

    createMarkerEvent(marker);

}


function createMarkerEvent(marker) {
    google.maps.event.addListener(marker, 'click', function (marker, i) {
        // if ($('#info-container').css('display') == 'block') {
        //     $('#info-container').css('display', 'none');
        // } else {
        //     $('#info-container').css('display', 'block');
        // }
        // console.log(marker);
        // $('#info-container').text("clicked");

    });

}

