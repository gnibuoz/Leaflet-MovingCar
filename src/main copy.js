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
        title: "西安市植物园",
        image:"./data/pannel/西安市植物园.jpg"
    }, {
        center: [34.203178, 108.978581],
        icon: icons['scenic'],
        title: "曲江池",
        image:"./data/pannel/.jpg"
    },
    {
        center: [34.213931, 108.969827],
        icon: icons['scenic'],
        title: "大唐芙蓉园",
        image:"./data/pannel/.jpg"
    },
    {
        center: [34.239834, 108.937511],
        icon: icons['park'],
        title: "小雁塔公园",
        image:"./data/pannel/小雁塔公园.jpeg"
    },
    {
        center: [34.322457, 108.931332],
        icon: icons['park'],
        title: "文景公园",
        image:"./data/pannel/文景公园.jpg"
    },
    {
        center: [34.292041, 108.95957],
        icon: icons['scenic'],
        title: "大明宫国家遗址公园",
        image:"./data/pannel/大明宫国家遗址公园.jpg"
    },
    {
        center: [34.255656, 108.979354],
        icon: icons['park'],
        title: "兴庆宫公园",
        image:"./data/pannel/兴庆宫公园.jpg"
    },
    {
        center: [34.197499, 108.883567],
        icon: icons['flag'],
        title: "都市之门",
        image:"./data/pannel/info.jpg"
    },
    {
        center: [34.19221, 108.868589],
        icon: icons['location'],
        title: "研祥城市广场",
        image:"./data/pannel/yanxiang.jpg"
    },
    {
        center: [34.205982, 108.904295],
        icon: icons['scenic'],
        title: "唐城遗址地质公园",
        image:"./data/pannel/遗址公园.jpg"
    },
    {
        center: [34.211731, 108.891249],
        icon: icons['scenic'],
        title: "木塔寺公园",
        image:"./data/pannel/木塔寺公园.jpg"
    },
    {
        center: [34.20403, 108.880477],
        icon: icons['marker'],
        title: "体育训练中心",
        image:"./data/pannel/体育训练中心.jpg"
    },
    {
        center: [34.197605, 108.867989],
        icon: icons['marker'],
        title: "绿地世纪城",
        image:"./data/pannel/绿地世纪城.png"
    },
    {
        center: [34.249519, 108.893566],
        icon: icons['scenic'],
        title: "丰庆公园",
        image:"./data/pannel/丰庆公园.jpg"
    },
    {
        center: [34.177193, 108.869319],
        icon: icons['marker'],
        title: "紫薇田园都市文化广场",
        image:"./data/pannel/文化广场.jpg"
    },
    {
        center: [34.303135, 108.857726],
        icon: icons['scenic'],
        title: "未央宫",
        image:"./data/pannel/未央宫.jpg"
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
    // 空格键 重置为全局视角
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
//     var content = '点击坐标:';
//     content += e.latlng.toString();
//     mypop.setLatLng(e.latlng)
//         .setContent(`<div style="color:red;">${content}</div>`)
//         .openOn(map);
// });


document.onselectstart = function () { return false; }; //取消字段选择功能

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
* 度换成弧度
* @param  {Float} d  度
* @return {[Float}   弧度
*/
function rad(d) {
    return d * Math.PI / 180.0;
}

/**
 * 弧度换成度
 * @param  {Float} x 弧度
 * @return {Float}   度
 */
function deg(x) {
    return x * 180 / Math.PI;
}

let historyPath = [[34.23161104078327, 108.94221787810714], [34.231890221507804, 108.93384245637107], [34.23152607273668, 108.9262560236391], [34.23492479460059, 108.91788060190302], [34.23653994945498, 108.9189527220938], [34.252356315101885, 108.91891268066176], [34.252596563693984, 108.93869314807841], [34.25125537047563, 108.94073661749366], [34.25123669048708, 108.94432317529532], [34.252357489800104, 108.94572417443659], [34.25253868103027, 108.96107196807861], [34.242628282754936, 108.9611977179863], [34.24268490989115, 108.94924939224472], [34.231628463318366, 108.94911131121556], [37.869873046875, 110.599365234375]];
let car = L.marker([34.23161104078327, 108.94221787810714], { title: '车辆-001', draggable: true, autoPan: true, icon: L.icon({ iconUrl: 'data/icon/trunk.png', iconSize: [32, 24], iconAnchor: [16, 24], }) });


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