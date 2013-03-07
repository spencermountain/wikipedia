(function() {
  var _ =require('underscore');
  var request = require('request');
  var wikipedia_host='http://en.wikipedia.org/w/api.php';

  var wp={};//public
  var fns={};//helpers


 fns.http= function(url, callback) {
    if(!url) {
      return callback({
        error: "bad url"
      })
    }
    request({
      uri: url,
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0"
      }
    }, function(error, response, body) {
      try {
        return callback(JSON.parse(body))
      } catch(e) {
        return callback(body)
      }
    })
  }


wp.categories=function(q, options, callback){
  this.doc="get the wikipedia categories for a topic"
  var url=wikipedia_host+'?action=query&prop=categories&format=json&clshow=!hidden&cllimit=200&titles='+encodeURIComponent(q);
  fns.http(url, function(r){
    if(!r || !r.query || !r.query.pages || !r.query.pages[Object.keys(r.query.pages)[0]]){return ps.callback([])}
    var cats=r.query.pages[Object.keys(r.query.pages)[0]].categories ||[]
    cats=cats.map(function(v){return v.title})
    return callback(cats)
  })
}
//wp.categories("Toronto", {}, console.log)
//wp.categories("Thom Yorke", {}, console.log)//****

return wp;
})();