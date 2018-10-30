import React, { Component } from 'react'
import BeerCard from './beerCard'

export default class favourite extends Component {

  constructor(){
    super();
    this.state={
      beers:[],
      featured:[],
      featuredUnique:[]
    };
  }
  
componentDidMount(){
  let featured= localStorage.getItem('featured');  
  let featuredUnique= localStorage.getItem('featuredUnique');      
  if(featured==null){
    this.setState({featured:[],beers:[],featuredUnique:[]})
  } 
  else{
   this.setState({featured:JSON.parse(featured),beers:JSON.parse(featured), featuredUnique:JSON.parse(featuredUnique)})
  }
  }

  featureBeer=(item,index)=>{
    let beers=this.state.beers;
    let featured=this.state.featured;
    let featuredUnique=this.state.featuredUnique;

    beers[index].featured=!beers[index].featured;

    if(beers[index].featured){     
      featured.push(beers[index]);     
      featuredUnique.push(beers[index].name);
      localStorage.setItem('featured',JSON.stringify(featured))
      localStorage.setItem('featuredUnique',JSON.stringify(featuredUnique)) 
    }

    else{

     let index1= featured.findIndex(beer=>beer.name==item.name);
     let index2= featuredUnique.indexOf(item.name);
      featured.splice(index1,1);     
      featuredUnique.splice(index2,1);
      localStorage.setItem('featured',JSON.stringify(featured))
      localStorage.setItem('featuredUnique',JSON.stringify(featuredUnique))


    }

    this.loadData()   

  }
  loadData=()=>{
    let featured= localStorage.getItem('featured');  
    let featuredUnique= localStorage.getItem('featuredUnique');      
    if(featured==null){
      this.setState({featured:[],featuredUnique:[]})
    } 
    else{   this.setState({featured:JSON.parse(featured),beers:JSON.parse(featured), featuredUnique:JSON.parse(featuredUnique)})

    }
  }

  render() {
    return (
      <div className="container">
      <BeerCard beers={this.state.beers} featureBeer={this.featureBeer} />
      </div>
    )
  }
}
