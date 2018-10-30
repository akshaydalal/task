import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class BeerCard extends Component {
   
    constructor(props){
        super(props);
        this.state={
          beers:[]   
        };
      }
    componentDidMount(){
      this.setState({beers:this.props.beers})  
    }
    componentWillReceiveProps(nextProps){        
        this.setState({beers:nextProps.beers})  
      }     
  render() {
    return (
        <div className="columns is-multiline">
        {this.state.beers.map((beer,index)=>{
          return  <div className="column is-4" key={index}>    
          <div className="card">  
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-24x24">
                    <img src={beer.image_url} alt="img" />
                  </figure>
                </div>
                <div className="media-content">                   
                  <div className="bd-tw-name">
                    <strong className="bd-tw-fullname">
                    {(beer.name.length>30 ? (beer.name).slice(0,30) + '..' :(beer.name))}
                    </strong> 
                    <span className="icon is-small pull-right" onClick={e=>this.props.featureBeer(beer,index)} style={{color:beer.featured ? 'yellow':'lightgrey'}}>
                              <i className="fa fa-star"></i>
                    </span>                    
                  </div>
                  <div className="content">                                       
                      {(beer.description.length>140 ? (beer.description).slice(0,140) + '..' :(beer.description))}
                  </div>
                </div>
              </div>
          
              
            </div>
          </div>
        </div> })}
          </div>
          

    )
  }  
}
BeerCard.propTypes={   
    beers:PropTypes.array.isRequired    
}
