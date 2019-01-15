const http = require('http');
const watson = require('watson-developer-cloud');

var portNumber = process.env.VCAP_APP_PORT || 8080;
const server = http.createServer(handleRequests);
server.listen(portNumber, function() {
 console.log('Server is up!');
});
function handleRequests(userRequest, userResponse) {
  userResponse.writeHead(200, {'Content-Type': 'text/plain'});
  var helloText = 'Hello';
  var toLanguage = 'es';
  var fromLanguage = 'en';
  var language_translator = watson.language_translator({
    version: 'v2'
  });

  var callback = function(err, data) {
  if (err) {
  console.log(err);
  userResponse.end('Error: ' + err);
  } else {
  console.log(data);
  userResponse.end('Translation of ' + helloText + " is " +
  data.translations[0].translation);
  }
  };

  language_translator.translate({
    text: helloText,
    source: fromLanguage,
    target: toLanguage
  }, callback);


}
