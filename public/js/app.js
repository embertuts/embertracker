App = Ember.Application.create();

App.Router.map(function() {
  this.resource('issues', {path: 'issues'}, function() {
    this.route('new');
    this.resource('issue', {path: ':issue_id'});
  });
});

App.IssuesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('issue');
  }
});

App.IssuesNewRoute = Ember.Route.extend({
  model: function() {
    return {title: '', body: ''};
  }
});

App.IssueRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('issue', params.issue_id);
  }
});

App.IssuesController = Ember.ArrayController.extend({
  sortProperties: ['id']
});

App.IssueController = Ember.ObjectController.extend({
  editing: false,
  actions: {
    edit: function() {
      this.set('editing', true);
    },
    doneEditing: function() {
      this.set('editing', false);
      this.get('model').save();
    }
  }
});

App.IssuesNewController = Ember.ObjectController.extend({
  needs: ['issues'],
  actions: {
    createIssue: function() {
      var model = this.get('model'),

        issue = this.store.createRecord('issue', model);

      issue.save()
      .then(function() {
        this.transitionToRoute('issue', issue);
      }.bind(this));
    }
  }
});

var showdown = new Showdown.converter();
Ember.Handlebars.helper('markdown', function(text) {
  return new Handlebars.SafeString(showdown.makeHtml(text));
});