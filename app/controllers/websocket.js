import Ember from 'ember';

export default Ember.Controller.extend({
  _setup: function () {
    let hostname = window.location.hostname;
    let websocket = this.websocket = new WebSocket('ws://%@:8080'.fmt(hostname));

    this.subscribers = [];

    websocket.onmessage = function (event) {
      if (!this.subscribers) { return; }
      let message = JSON.parse(event.data);
      this.subscribers.forEach( (callback) => callback(message) );
    }.bind(this);

  }.on('init'),

  sendMessage: function (message) {
    this.websocket.send(message);
  },

  subscribe: function (callback) {
    this.subscribers.pushObject(callback);
  },

  unsubscribe: function (callback) {
    this.subscribers.removeObject(callback);
  }
});
