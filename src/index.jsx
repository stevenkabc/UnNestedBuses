import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Stops from './stationsUnNested';
import uniqby from 'lodash.uniqby';

class StopsCollection2 extends Component {
  constructor(props){
    super(props);


    this.State = {
      stopNames: [],
      stops: [...[Stops]]

    }
  }

  getStops() {
     let stopNames = uniqby(this.props.stops.map( (stop) => {
       return ({routeCode: stop.routeCode, stopName: stop.stopName})
     }),'stopName');

     return stopNames;
  //  this.setState({stopNames});


  }
componentWillMount() {
  this.setState({stopNames: this.getStops()});
}

  render () {
    let stopName="";
    let key = 1;
    return(
      <div>
        { this.props.stops.map((stop) => {
          console.log(stop.stopCity);
          if( stop.day === this.props.day &&
          stop.stopCity.toUpperCase() === this.props.stopCity) {
            if(stopName !== stop.stopName) {
              stopName = stop.stopName;
              // console.log(stopName);
              // console.log(stop.scheduledTime + " - ", stop.routeEnd);
              return(
                <div >
                  <div>{stop.stopCity}</div>
                  <div>{stop.stopName}</div>
                  <div key={++key} >
                    {stop.stopCode}{stop.routeSuffix}": "{stop.scheduledTime} - {stop.routeEnd}
                  </div>
                </div>
              )
            }
            else {
              console.log(stop.scheduledTime + " - ", stop.routeEnd);
              return(
                <div key={++key}>
                  {stop.routeCode}{stop.routeSuffix}": "{stop.scheduledTime} - {stop.routeEnd}
                </div>

              )
            }
          }
          else {
            return false;
          }
        })}
      </div>
    )
  }
}
class App2 extends Component {
  render () {
    return (
      <div>
        <StopsCollection2
          stops={Stops}  stopCity={"MONTCLAIR"} day={"Daily"}>
        </StopsCollection2>
      </div>
    );
  }
}

class BusStops extends React.Component {
  render () {
    return <ul>{this.props.stops.map(this.renderBusStop)}</ul>;
  }

  renderBusStop({routeCode, stopName}) {
    return (
      <li>{routeCode}-{stopName}
        <div>

        </div>
      </li>
    )

  }
}

class BusStopsCollection extends Component {
  constructor(props){
    super(props);

    this.State = {
      stopNames: []
    }
  }

  getStopNames() {
    let key = 1;
    let stopNames = uniqby(this.props.stops,'stopName')
      .sort((a,b) => {
        // if(a.routeCode < b.routeCode) return -1;
       //  if(a.routeCode > b.routeCode) return 1;
        // if(a.routeInstance < b.routeInstance) return -1;
       //  if(a.routeInstance > b.routeInstance) return 1;
         return a.stopID < b.stopID ?  -1 : a.stopID > b.stopID ?  1 : 0;         
      })
      .map( (stop) => {
        return ({routeCode: stop.routeCode, stopName: stop.stopName})
      });
      debugger;
      return stopNames


  }
  componentWillMount() {
    let stopNames = this.getStopNames();
    this.setState({stopNames});
  }
  render() {
    return <BusStops stops={this.state.stopNames} />
  }
}

class App extends Component {
  render () {
    return   <BusStopsCollection stops={Stops}></BusStopsCollection>
  }

}

ReactDOM.render(<App />, document.getElementById('app'));
