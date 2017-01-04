

module.exports = {


returnEnvironmentURL: function returnEnvironmentURL(){
  if(process.env.NODE_ENV){
    return "https://stack-of-all-trade.herokuapp.com";
  }
  else{
    return "http://localhost:3000";
  }
}

}
