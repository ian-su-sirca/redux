module.exports = {
  before: browser => {
    // see http://nightwatchjs.org/guide/#page-objects
    this.page = browser.page.todomvc();
    this.page.navigate();
  },

  after: browser => {
    browser.end();
  },

  'Add a TODO': browser => {
    const page = this.page;
    // always wait for an element to be ready...
    page.expect.element('.new-todo').to.be.enabled.before(1000);
    // ...before doing an action on it
    page.setValue('.new-todo', 'Buy milk');
    page.api.keys(browser.Keys.ENTER);

    page.expect.element('.main .view label').text.to.equal('Buy milk').before(1000);
  }
};
