const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('onOrderCreation', () => {
    console.log('onOrderCreation');
});