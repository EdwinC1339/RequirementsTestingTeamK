import React, { Component } from "react";
import "./styles/styles.css";
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};


// const google = window.google = window.google ? window.google : {}




export default class DMap extends Component {
  // displayMap() {
  //   const mapOptions = {
  //     center: { lat: -33.860664, lng: 151.208138 },
  //     zoom: 14
  //   };
  //   const mapDiv = document.getElementById('map-div');
  //   const map = new google.maps.Map(mapDiv, mapOptions);
  //   return map;
  // }
  // constructor() {
  //   super()

  //   this.state = {
  //     map : <div className="map-div"></div>




  //   }














  //   const apiOptions = {
  //     apiKey: "AIzaSyAMxYtvAIg3PXXAqN2ijsFRs2juKyMJN1I"
  //   }
   
  
    
  //   const loader = new Loader(apiOptions);
  
  
  
    


  //   loader.load().then(() => {
  //     console.log('Maps JS API loaded');
  //     this.state.map = this.displayMap();
  //   });
  // }

  // displayMap() {
  //   const mapOptions = {
  //     center: { lat: -33.860664, lng: 151.208138 },
  //     zoom: 14
  //   };
  //   const map = new google.maps.Map(this.state.map, mapOptions);
  //   return map;
  // }



  
  render() {
    return (
      <div className="map-div"></div>
    );
  }

}



