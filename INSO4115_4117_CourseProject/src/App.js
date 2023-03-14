import logo from "./logo.svg";
import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth.jsx";
import Contact from "./pages/Contact.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { Component } from "react";
import { Loader } from '@googlemaps/js-api-loader';


import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10.5}
        style={mapStyles}
        initialCenter={
          {
            lat: 18.26633000,
            lng: -66.40572000
          }
        }
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'put api here'
})(MapContainer);

