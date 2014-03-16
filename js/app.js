App = Ember.Application.create();

App.Router.map(function() {
  this.resource('issues', {path: 'issues'}, function() {
    this.route('new');
    this.resource('issue', {path: ':issue_id'});
  });
});

App.IssuesRoute = Ember.Route.extend({
  model: function() {
    return issues;
  }
});

App.IssuesNewRoute = Ember.Route.extend({
  model: function() {
    return {title: '', body: ''};
  }
});

App.IssueRoute = Ember.Route.extend({
  model: function(params) {
    return issues.findBy('id', parseInt(params.issue_id, 10));
  }
});

App.IssueController = Ember.ObjectController.extend({
  editing: false,
  actions: {
    edit: function() {
      this.set('editing', true);
    },
    doneEditing: function() {
      this.set('editing', false);
    }
  }
});

App.IssuesNewController = Ember.ObjectController.extend({
  needs: ['issues'],
  actions: {
    createIssue: function() {
      var model = this.get('model');
      var issues = this.get('controllers.issues').get('model');
      issues.unshiftObject(this.get('model'));
      this.transitionToRoute('issue', model);
    }
  }
});

var showdown = new Showdown.converter();
Ember.Handlebars.helper('markdown', function(text) {
  return new Handlebars.SafeString(showdown.makeHtml(text));
});