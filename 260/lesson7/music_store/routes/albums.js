
var singleton = require('./singleton');

module.exports = function(router) {
  router.get('/albums/new', function(req, res, next) {
    res.render('new', {
      albums: singleton.get()
    });
  });
  router.post('/albums', function(req, res, next) {
    var album = req.body;
    var albums = singleton.get();
    album.id = singleton.getLastID() + 1;
    albums.push(album);
    singleton.set({last_id: album.id, data: albums});
    res.json(album);
  });
  router.put('/albums', function(req, res) {
    console.log(req.body);
    var id = parseInt(req.body.id, 10);
    var album = _(singleton.collection).findWhere({id: id});
    album = req.body.album;
    singleton.set(albums);

    res.json(album);
  });
  router.delete('/', function(req, res) {
    console.log(req.body);
    var id = parseInt(req.body, 10);
    var albums = _(singleton.collection).reject({id: id});
    singleton.set(albums);
    res.status(200).end();
  });
};