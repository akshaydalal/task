import React, { Component } from 'react'
import BeerCard from './beerCard'
import axios from 'axios'
var pageNumber=1;
var searchBeerText='';

export default class home extends Component {
  constructor(){
    super();
    this.state={
      beers:[],
      featured:[],
      featuredUnique:[]
    }
  }

  componentWillMount(){
    this.getData()
    
    let featured= localStorage.getItem('featured');  
    let featuredUnique= localStorage.getItem('featuredUnique');      
    if(featured==null){
      this.setState({featured:[],featuredUnique:[]})
    } 
    else{
     this.setState({featured:JSON.parse(featured),featuredUnique:JSON.parse(featuredUnique)})
    }
  }
  componentDidMount(){
    pageNumber=1; 
    window.addEventListener('scroll',this.loadMoreBeer);

  
  }
  getData=()=>{
    let url='https://api.punkapi.com/v2/beers?page='+pageNumber+'&per_page=20'
    if(searchBeerText.length>1){
      url=url+'&beer_name='+searchBeerText
    }
    pageNumber=pageNumber+1;  
    axios.get(url)
    .then(response=>{ 
      let result=[];      
      if(pageNumber>2){
        
         result=this.state.beers;
        response.data.map((item,index)=>{
          item.featured=false;           
          if(this.state.featuredUnique.indexOf(item.name)!=-1){
            item.featured=true;
          }
         
          result.push(item);
        
        })
        
      }
      else  
      {
       
        
        response.data.map((item,index)=>{
          item.featured=false;
          if(this.state.featuredUnique.indexOf(item.name)!=-1){
            item.featured=true;
          }
          result.push(item);
      
        })
      }
      this.setState({beers:result})
        
    })
  }
  searchBeer=(text)=>{
   searchBeerText=text;
   pageNumber=1;
   setTimeout(this.getData(),1000);
  }

  loadMoreBeer=()=>{
    var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      var body = document.body,
          html = document.documentElement;
      var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
     var windowBottom = windowHeight + window.pageYOffset + 70;
      if (windowBottom >= docHeight) {
         this.getData();
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
    this.setState({beers})
  }

  render() {
    return (
      <div className="container">
              <div className="columns is-mobile">
                <div className="column is-half is-offset-one-quarter">
                            <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input className="input" onChange={e=>this.searchBeer(e.target.value)} type="text" placeholder="Search For Beers" />
                                <span className="icon is-small is-left">
                                <i className="fa fa-search"></i>
                              </span>
                              </p>                      
                            </div>
                </div>
               </div>

              
      <BeerCard beers={this.state.beers} featureBeer={this.featureBeer} />
      </div>
    )
  }
}
