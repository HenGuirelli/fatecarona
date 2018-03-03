export default function reducer(state={
    map: {},
    unRendered: true,
    dirServ: {},
    dirDisp: {},
    error: null,
  }, action) {
    switch (action.type) {
      case 'MAP_RENDER': {
        var bundle = setMap()
        return {
          ...state, 
          unRendered: false, 
          map: bundle.map,
          dirServ: bundle.dirServ,
          dirDisp: bundle.dirDisp,
        }
      } 
      default: {
        return state
      }
    }
}

function setMap() {
  var map = new window.google.maps.Map(document.querySelector('.Map'), {
    center: {
      lat: -23.6234, 
      lng: -46.5552
    },
    zoom: 10 
  })
  var dirServ = new window.google.maps.DirectionsService();
  var dirDisp = new window.google.maps.DirectionsRenderer({
    draggable: true,
    map: map,
  });
  return {map, dirServ, dirDisp}
}