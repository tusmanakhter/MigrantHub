var expect = require('chai').expect;

var Event = require('../../models/Event');

describe('Event', function() {
  it('should be invalid if user, visibility, eventName, description, dateStart, dateEnd, timeStart, ' +
    'timeEnd or dateCreated is empty', function(done) {
    var event = new Event();

    event.validate(function(err) {
      expect(err.errors.user).to.exist;
      expect(err.errors.visibility).to.exist;
      expect(err.errors.eventName).to.exist;
      expect(err.errors.description).to.exist;
      expect(err.errors.dateStart).to.exist;
      expect(err.errors.dateEnd).to.exist;
      expect(err.errors.timeStart).to.exist;
      expect(err.errors.timeEnd).to.exist;
      expect(err.errors.dateCreated).to.exist;
      done();
      });
  });
});