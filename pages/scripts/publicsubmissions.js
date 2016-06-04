var $ = require('jquery');
var DOM = require('jsx-dom-factory');
global.jQuery = $;

// inject css c/o browserify-css
require('../styles/publicsubmissions.css');

function make_public_submission(name, dataz, text) {
  return (
    <div class="panel panel-default" style="margin-top:10px">
      <div class="panel-heading">
        <h3 class="panel-title">RFA Submission from {name}</h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-8">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>Sam</td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>123 Jones St.</td>
                </tr>
              </tbody>
            </table>
            {text}
          </div>
          <div class="col-md-4">
            <div class="well pull-right" style="width:250px;height:250px;"></div>
          </div>
        </div>
        <div class="row">
        </div>
      </div>
      <div class="panel-footer text-right">
        <button type="button" class="btn btn-danger">Reject</button>
        <button type="button" class="btn btn-success">Accept</button>
      </div>
    </div>
  );
}

$('#content').append(make_public_submission(
  'Sam Dunster',
  {
    'Name': 'Sam Dunster',
    'Address': '123 Blah St',
    'Foo': 'bar'
  },
  'Tree down in front yard. Dog missing. Please send help. My bedroom is on fire. My living room is underwater. There is a wall missing. My roof caved in. Please help.'
));

