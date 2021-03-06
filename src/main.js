var map = L.map('map', {
    // crs: L.CRS.EPSG4326,
    zoom: 0,
    minZoom: 0,
    maxZoom: 15,
    zoomAnimation: true,
    zoomDelta: 1,
    zoomSnap: 0.1,
    attributionControl: false,
    zoomControl: false,
    doubleClickZoom: false,
    inertia: false,
    //maxBounds: bounds,
    //preferCanvas: true,
    maxBoundsViscosity: 1.0,
    //wheelPxPerZoomLevel: 140,
    preferCanvas: true
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.tileLayer('./data/map/OMS/{z}/{x}/{y}.png', {
    maxNativeZoom: 7,
    reuseTiles: true,
    tms: true,
}).addTo(map);

L.tileLayer('./data/map/OMS/{z}/{x}/{y}.png', {
    maxNativeZoom: 15,
    reuseTiles: true,
    tms: true,
}).addTo(map);

map.addControl(new L.Control.Compass({ autoActive: true, showDigit: true }));
map.addControl(new L.Control.Zoomslider({ position: "bottomright" }));

var markerLayerGroup = new L.FeatureGroup();
map.on('zoomend', function () {
    if (map.getZoom() < 10) {
        map.removeLayer(markerLayerGroup);
    }
    else {
        map.addLayer(markerLayerGroup);
    }
});

function addMarker(latLng, icon, title, image) {
    var marker1 = L.marker(latLng, {
        draggable: true,
        icon: icon
    });
    marker1.bindPopup(`<div style="color:darkblue;font-weight:bold;">${title}<img src="${image}" style="width:100%"/></div>`, { minWidth: 300 });
    marker1.on('popupopen', (e) => {
        map.flyTo(e.popup.getLatLng(), map.getZoom() > 14 ? map.getZoom() : 14, {
            animate: true,
        });
    });
    markerLayerGroup.addLayer(marker1);
}

let icons = {
    flag: L.icon({
        iconUrl: './data/icon/flag.png',
        iconSize: [32, 32],
        iconAnchor: [4, 30],
        popupAnchor: [6, -32],
    }),
    marker: L.icon({
        iconUrl: './data/icon/marker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 30],
        popupAnchor: [0, -32],
    }),
    location: L.icon({
        iconUrl: './data/icon/location.png',
        iconSize: [32, 32],
        iconAnchor: [16, 26],
        popupAnchor: [0, -32],
    }),
    locationBlue: L.icon({
        iconUrl: './data/icon/locationBlue.png',
        iconSize: [32, 32],
        iconAnchor: [16, 26],
        popupAnchor: [0, -32],
    }),
    scenic: L.icon({
        iconUrl: './data/icon/scenic.png',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -20],
    }),
    park: L.icon({
        iconUrl: './data/icon/park.png',
        iconSize: [40, 20],
        iconAnchor: [20, 10],
        popupAnchor: [0, -14],
    }),
};

/*
{
    center: [],
    icon: icons['scenic'],
    title: "",
    image: ".jpg"
},
*/

let markers = [
    {
        center: [34.209424, 108.95618],
        icon: icons['scenic'],
        title: "??????????????????",
        image:"./data/pannel/??????????????????.jpg"
    }, {
        center: [34.203178, 108.978581],
        icon: icons['scenic'],
        title: "?????????",
        image:"./data/pannel/.jpg"
    },
    {
        center: [34.213931, 108.969827],
        icon: icons['scenic'],
        title: "???????????????",
        image:"./data/pannel/.jpg"
    },
    {
        center: [34.239834, 108.937511],
        icon: icons['park'],
        title: "???????????????",
        image:"./data/pannel/???????????????.jpeg"
    },
    {
        center: [34.322457, 108.931332],
        icon: icons['park'],
        title: "????????????",
        image:"./data/pannel/????????????.jpg"
    },
    {
        center: [34.292041, 108.95957],
        icon: icons['scenic'],
        title: "???????????????????????????",
        image:"./data/pannel/???????????????????????????.jpg"
    },
    {
        center: [34.255656, 108.979354],
        icon: icons['park'],
        title: "???????????????",
        image:"./data/pannel/???????????????.jpg"
    },
    {
        center: [34.197499, 108.883567],
        icon: icons['flag'],
        title: "????????????",
        image:"./data/pannel/info.jpg"
    },
    {
        center: [34.19221, 108.868589],
        icon: icons['location'],
        title: "??????????????????",
        image:"./data/pannel/yanxiang.jpg"
    },
    {
        center: [34.205982, 108.904295],
        icon: icons['scenic'],
        title: "????????????????????????",
        image:"./data/pannel/????????????.jpg"
    },
    {
        center: [34.211731, 108.891249],
        icon: icons['scenic'],
        title: "???????????????",
        image:"./data/pannel/???????????????.jpg"
    },
    {
        center: [34.20403, 108.880477],
        icon: icons['marker'],
        title: "??????????????????",
        image:"./data/pannel/??????????????????.jpg"
    },
    {
        center: [34.197605, 108.867989],
        icon: icons['marker'],
        title: "???????????????",
        image:"./data/pannel/???????????????.png"
    },
    {
        center: [34.249519, 108.893566],
        icon: icons['scenic'],
        title: "????????????",
        image:"./data/pannel/????????????.jpg"
    },
    {
        center: [34.177193, 108.869319],
        icon: icons['marker'],
        title: "??????????????????????????????",
        image:"./data/pannel/????????????.jpg"
    },
    {
        center: [34.303135, 108.857726],
        icon: icons['scenic'],
        title: "?????????",
        image:"./data/pannel/?????????.jpg"
    },
    // {
    //     center:[],
    //     icon: icons['marker'],
    //     title:"",
    //     image:"yanxiang.jpg"
    // },
    // {
    //     center:[],
    //     icon: icons['marker'],
    //     title:"",
    //     image:"yanxiang.jpg"
    // }

];

let bounds = [];
markers.forEach((marker) => {
    addMarker(marker.center, marker.icon, marker.title, marker.image);
    bounds.push(marker.center);
});

let boundingBox = L.latLngBounds(bounds).pad(0.1);
map.on('keypress', (e) => {
    // ????????? ?????????????????????
    if (e.originalEvent.key === ' ') {
        map.flyToBounds(boundingBox, {
            animate: true,
            // duration: 10.0,
        });
    }
});

let scenarioBound = L.rectangle([[54.789185, 54.862058], [13.614872, 168.829438]], { color: '#00fff6', weight: 1.25, fillOpacity: 0.05, fill: false, interactive: false })
map.fitBounds(scenarioBound.getBounds());

setTimeout(() => {
    map.flyToBounds(boundingBox, {
        animate: true,
        // duration: 10.0,
    });
}, 1500);


// var mypop = L.popup();
// map.on('click', function (e) {
//     var content = '????????????:';
//     content += e.latlng.toString();
//     mypop.setLatLng(e.latlng)
//         .setContent(`<div style="color:red;">${content}</div>`)
//         .openOn(map);
// });


document.onselectstart = function () { return false; }; //????????????????????????

var currentCoord = null;

const WGS_84_RADIUS_EQUATOR = 6378137.0;
const WGS_84_RADIUS_POLAR = 6356752.3142;

function bearing(lat1Rad, lon1Rad,
                 lat2Rad, lon2Rad)
{
    let dLon = (lon2Rad-lon1Rad); 
    let y =  Math.sin(dLon) *  Math.cos(lat2Rad);
    let x =  Math.cos(lat1Rad)* Math.sin(lat2Rad) -  Math.sin(lat1Rad)* Math.cos(lat2Rad)* Math.cos(dLon);
    return  Math.atan2(y, x);
}

function distance(lat1Rad, lon1Rad, lat2Rad, lon2Rad, radius = WGS_84_RADIUS_EQUATOR)
{  	
    let dLat = (lat2Rad-lat1Rad);
    let dLon = (lon2Rad-lon1Rad); 
    let a = Math.sin(dLat/2.0) * Math.sin(dLat/2.0) +
    Math.cos(lat1Rad) *  Math.cos(lat2Rad) * 
    Math.sin(dLon/2.0) * Math.sin(dLon/2.0); 
    let c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0-a)); 
    let d = radius * c;
    return d;
}

function destination(lat1Rad, lon1Rad,
                     bearingRad, distance,
                     radius = WGS_84_RADIUS_EQUATOR)
{
    let dR = distance / radius;
    let out_latRad = Math.asin( Math.sin(lat1Rad)*Math.cos(dR) + 
    Math.cos(lat1Rad)*Math.sin(dR)*Math.cos(bearingRad) );
    let out_lonRad = lon1Rad + Math.atan2(Math.sin(bearingRad)*Math.sin(dR)*Math.cos(lat1Rad), 
    Math.cos(dR)-Math.sin(lat1Rad)*Math.sin(out_latRad));
    return [deg(out_latRad),deg(out_lonRad)];
}



/**
* ???????????????
* @param  {Float} d  ???
* @return {[Float}   ??????
*/
function rad(d) {
    return d * Math.PI / 180.0;
}

/**
 * ???????????????
 * @param  {Float} x ??????
 * @return {Float}   ???
 */
function deg(x) {
    return x * 180 / Math.PI;
}

let historyPath = [[34.23161104078327, 108.94221787810714], [34.231890221507804, 108.93384245637107], [34.23152607273668, 108.9262560236391], [34.23492479460059, 108.91788060190302], [34.23653994945498, 108.9189527220938], [34.252356315101885, 108.91891268066176], [34.252596563693984, 108.93869314807841], [34.25125537047563, 108.94073661749366], [34.25123669048708, 108.94432317529532], [34.252357489800104, 108.94572417443659], [34.25253868103027, 108.96107196807861], [34.242628282754936, 108.9611977179863], [34.24268490989115, 108.94924939224472], [34.231628463318366, 108.94911131121556], [37.869873046875, 110.599365234375]];
let car = L.marker([34.23161104078327, 108.94221787810714], { title: '??????-001', draggable: true, autoPan: true, icon: L.icon({ iconUrl: 'data/icon/trunk.png', iconSize: [32, 24], iconAnchor: [16, 24], }) });


let line = L.polyline([], { color: 'red', weight: 2 });

markerLayerGroup.addLayer(car);
markerLayerGroup.addLayer(line);


const speed = 600.0; // m/s

let frames = [];
let sumDis = 0;
for( let i = 1; i < historyPath.length; ++i ) {
    let p = historyPath[i-1];
    let n = historyPath[i ];


    //let dis = L.latLng( p[0],p[1] ).distanceTo( L.latLng(n[0], n[1]) );

    let b = bearing( rad(p[0]),rad(p[1]),rad(n[0]),rad(n[1]) );

    // if( i === 1 ){
    //     frames.push( {
    //         time:0,
    //         bearing:deg(b),
    //         distance:0,
    //         latLng:L.latLng( p[0],p[1] ),
    //     } );
    // }
    
    frames.push( {
        time:sumDis/speed,
        bearing:deg(b),
        distance:sumDis,
        latLng:L.latLng( p[0],p[1] ),
    } );

    let dis = distance( rad(p[0]),rad(p[1]),rad(n[0]),rad(n[1]) );
    sumDis = sumDis + dis;
}


let time = 0.0;

let points = [];
setInterval(() => {

    time += 0.05;

    let index = -1;
    for( let i = 1; i < frames.length; ++i ) {
        if( frames[i - 1].time < time && frames[i].time > time  ) {
            index = i;
            break;
        }
    }
    if( index === -1 ){
        time = 0.0;
        index = 1;
        points.length = 0;
    }

    let curDis = speed * time;   // m
    curDis = curDis - frames[index-1].distance;

    let pos = destination(rad(frames[index-1].latLng.lat),rad(frames[index-1].latLng.lng),rad(frames[index-1].bearing),curDis);

    car.setLatLng(pos);//destinationVincenty(car.getLatLng(),-80,10));
    points.push(pos);
    line.setLatLngs(points);

}, 50);

{
    map.addControl(L.control.styleEditor({
        position: 'topright',
        // colorRamp: ['#1abc9c', '#2ecc71', '#3498db'],
        markers: ['circle-stroked', 'circle', 'square-stroked', 'square']
    }));

    const m1 = L.circleMarker([51.50313, -0.091223], { radius: 10 });
    const m2 = L.marker([51.50614, -0.0989]);
    const m3 = L.marker([51.50915, -0.096112], { pmIgnore: true });

    const mGroup = L.layerGroup([m1, m2, m3]).addTo(map);
    // mGroup.pm.enable();

    map.pm.addControls({
        drawMarker: false,
        drawPolygon: true,
        editPolygon: false,
        drawPolyline: false,
        deleteLayer: true,
    });
    map.pm.addControls({
        drawMarker: true,
        drawPolygon: true,
        editPolygon: true,
        drawPolyline: true,
        deleteLayer: true,
    });
    map.on('pm:globaleditmodetoggled', function (e) {
        // console.log(e);
    });

    // GEOSJON EXAMPLE
    const geoJsonData = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: { customGeometry: { radius: 50 } },
                geometry: {
                    type: 'Point',
                    coordinates: [-0.152843, 51.486742, 77],
                },
            },
            {
                type: 'Feature',
                properties: { customGeometry: { radius: 20 } },
                geometry: {
                    type: 'Point',
                    coordinates: [-0.151727, 51.487472, 77],
                },
            },
            {
                type: 'Feature',
                properties: { customGeometry: { radius: 80 } },
                geometry: {
                    type: 'Point',
                    coordinates: [-0.153636, 51.486562, 77],
                },
            },
            {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [-0.15369, 51.486973, 77],
                            [-0.153853, 51.48686, 77],
                            [-0.154183, 51.486968, 77],
                            [-0.154001, 51.487087, 77],
                            [-0.15369, 51.486973, 77],
                        ],
                    ],
                },
            },
            {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [-0.15252, 51.487201, 77],
                            [-0.152789, 51.487281, 77],
                            [-0.153025, 51.487097, 77],
                            [-0.152633, 51.487002, 77],
                            [-0.152448, 51.487088, 77],
                            [-0.15252, 51.487201, 77],
                        ],
                    ],
                },
            },
            {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [-0.154241, 51.487382, 77],
                            [-0.1545, 51.487608, 77],
                            [-0.154905, 51.487384, 77],
                            [-0.154343, 51.487322, 77],
                            [-0.154241, 51.487382, 77],
                        ],
                    ],
                },
            },
            {
                type: 'Feature',
                properties: { customGeometry: { radius: 50 } },
                geometry: {
                    type: 'Point',
                    coordinates: [-0.153366, 51.487348, 77],
                },
            },
        ],
    };

    const theCollection = L.geoJson(geoJsonData, {
        pointToLayer: (feature, latlng) => {
            if (feature.properties.customGeometry) {
                return new L.Circle(latlng, feature.properties.customGeometry.radius);
            } else {
                return new L.Marker(latlng);
            }
        },
        // onEachFeature: (feature, layer) => {
        //     layer.addTo(map);
        // },
    });

    theCollection.addTo(map);

    const b = theCollection.getBounds();
    map.fitBounds(b);

    console.log(theCollection);

    theCollection.on('pm:edit', function (e) {
        console.log(e);
    });

    theCollection.on('pm:dragstart', function (e) {
        console.log(e);
    });

    // const geoJsonButton = document.getElementById('test-geojson');
    // const geoJsonLayer = L.geoJson(null, { pmIgnore: false });
    // geoJsonLayer.addTo(map);
    // geoJsonLayer.addData(geoJsonData);

    // geoJsonLayer.pm.toggleEdit({
    //     draggable: true,
    //     snappable: true,
    // });


    map.on('pm:drawstart', function (e) {
        var layer = e.workingLayer;
        // console.log(layer);
        layer.on('pm:centerplaced', function (e) {
            // console.log(e);
        });
    });
    map.on('pm:create', function (e) {
        var layer = e.layer;
        // console.log(layer);
        layer.on('pm:centerplaced', function (e) {
            // console.log(e);
        });
    });

    // Polygon Example

    const polygonLayer = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047],
    ])
        .addTo(map);

    // polygonLayer.pm.toggleEdit({
    //     allowSelfIntersection: false,
    //     preventVertexEdit: true,
    //     preventMarkerRemoval: false,
    // });

    polygonLayer.on('pm:update', function (e) {
        console.log(e);
    });

    polygonLayer.on('pm:intersect', function (e) {
        console.log(e);
    });

    // map.pm.toggleGlobalEditMode({
    //     allowSelfIntersection: false,
    //     preventMarkerRemoval: false,
    //     preventVertexEdit: false,
    // });
    // map.pm.disableGlobalEditMode();

    map.pm.enableDraw('Polygon', { allowSelfIntersection: false });
    map.pm.disableDraw('Polygon');
    map.pm.enableDraw('Line', { allowSelfIntersection: false });
    map.pm.disableDraw('Line');

    map.on('pm:create', function (e) {
        // e.layer.pm.enable({ allowSelfIntersection: false });
        // e.layer.pm.disable();
        // console.log(e.layer.pm.hasSelfIntersection());

        e.layer.on('pm:markerdragend', function (e) {
            // console.log(e);
        });

        e.layer.on('pm:update', function (e) {
            console.log(e);
        });

        e.layer.on('pm:cut', function (e) {
            console.log(e);
        });
    });

    map.on('pm:drawstart', function (e) {
        var layer = e.workingLayer;
        layer.on('pm:vertexadded', function (e) {
            // console.log(e);
            // console.log(e.workingLayer.pm.hasSelfIntersection());
        });
    });

    polygonLayer.on('pm:vertexadded', function (e) {
        // console.log(e);
    });
    polygonLayer.on('pm:vertexremoved', function (e) {
        // console.log(e);
    });

    polygonLayer.on('pm:markerdragstart', function (e) {
        // console.log(e);
    });

    // // Layer Group Example

    // const layerGroupItem1 = L.polyline(
    //   [[51.51, -0.09], [51.513, -0.08], [51.514, -0.11]],
    //   { pmIgnore: true }
    // );
    // const layerGroupItem2 = L.polygon([
    //   [51.52, -0.06],
    //   [51.51, -0.07],
    //   [51.52, -0.05],
    // ]);

    // const layerGroupItem3 = L.polygon([
    //   [51.51549835365031, -0.06450164634969281],
    //   [51.51944818307178, -0.08425079345703125],
    //   [51.51868369995795, -0.06131630004205801],
    //   [51.51549835365031, -0.06450164634969281],
    // ]);

    // const feature = {
    //   type: 'Feature',
    //   properties: {},
    //   geometry: {
    //     type: 'Polygon',
    //     coordinates: [
    //       [
    //         [72.839012, 19.058873],
    //         [72.92038, 19.066985],
    //         [72.856178, 19.019928],
    //         [72.839012, 19.058873],
    //       ],
    //     ],
    //   },
    // };

    // const layerGroup = L.featureGroup([layerGroupItem1]).addTo(map4);
    // layerGroup.pm.toggleEdit({
    //   draggable: true,
    //   snappable: true,
    //   snapDistance: 30,
    // });
    // const someLayer = L.geoJSON(feature);

    // layerGroup.addLayer(someLayer);

    // someLayer.addData(feature);

    // layerGroup.on('pm:snap', function(e) {
    //   console.log('snap');
    //   console.log(e);
    // });
    // layerGroup.on('pm:unsnap', function(e) {
    //   console.log('unsnap');
    //   console.log(e);
    // });


    // layerGroup.addLayer(layerGroupItem2);
    // layerGroup.addLayer(layerGroupItem3);
    // // layerGroup.addLayer(layerGroupItem4);
    // // layerGroup.addLayer(layerGroupItem5);

    // layerGroup.on('pm:dragstart', function(e) {
    //   console.log(e);
    // });
    // layerGroup.on('pm:drag', function(e) {
    //   console.log(e);
    // });
    // layerGroup.on('pm:dragend', function(e) {
    //   console.log(e);
    // });
    // layerGroup.on('pm:markerdragstart', function(e) {
    //   console.log(e);
    // });
    // layerGroup.on('pm:markerdragend', function(e) {
    //   console.log(e);
    // });
}