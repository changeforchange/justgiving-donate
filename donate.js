var casper = require('casper').create();

var charity = casper.cli.get("charity");
var amount = casper.cli.get("amount");

var url = 'http://www.justgiving.com/4w350m3/donation/direct/charity/' + charity + '?amount=' + amount + '&currency=GBP';

var email = '';
var password = '';

casper.options.waitTimeout = 20000;
casper.options.viewportSize = { width: 950, height: 950 };

casper.start(url, function() {

  this.echo(this.getTitle());

});

casper.waitForSelector('.awesome-continue-button').thenClick('.awesome-continue-button', function() {
  console.log('Entered main process');
  this.wait(2000);
});

// Enter email

casper.waitForSelector('#Identity_EmailAddress').then(function() {
  casper.sendKeys('#Identity_EmailAddress', email);
});

casper.waitForSelector('.awesome-continue-button').thenClick('.awesome-continue-button', function() {
  console.log('Entered email');
  this.wait(2000);
});

// Sign in

casper.waitForSelector('#Authentication_Password').then(function() {
  casper.sendKeys('#Authentication_Password', password);
});

casper.waitForSelector('.awesome-continue-button').thenClick('.awesome-continue-button', function() {
  console.log('Entered password');
  this.wait(2000);
});

// Donate

// casper.then(function() {
//   casper.capture('final.png');
// });

casper.waitForSelector('#donate-now-button').thenClick('#donate-now-button', function() {
  console.log('Clicked donated button');
  this.wait(2000);
});

casper.waitForSelector('#donation-confir-status').then(function() {
  console.log('confirmed!');
  this.exit(0); // Whooo it worked!
});

casper.run();
