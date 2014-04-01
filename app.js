var express = require('express'),
  path = require('path'),
  issues = require('./data').issues,
  id = 123,
  app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

app.get('/issues', function(req, res) {
  res.send({'issues': issues});
});

app.put('/issues/:id', function(req, res) {
  for (var i = issues.length - 1; i >= 0; i--) {
    if (issues[i].id == req.params.id) {
      issues[i].title = req.body.issue.title;
      issues[i].body = req.body.issue.body;
      res.send({'issue': issues[i]});
      break;
    }
  }
});

app.post('/issues', function(req, res) {
  var issue = req.body.issue;
  issue.id = id++;
  issues.unshift(issue);
  res.send({'issue': issue});
});

app.listen(3000, function() {
  console.log('Express server listening on port 3000');
});