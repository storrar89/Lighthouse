var $ = require('jquery');
var inject = require('../../../lib/inject.js');
var DOM = require('jsx-dom-factory');


//add csv

var bar = $('#createNitcForm');

$(
  <div class="col-xs-7">
    <div class="widget">
        <div class="widget-header">
            <h3><i class="fa fa-bookmark-o"></i>CSV Import</h3>
            
        </div>
        <div class="widget-content">
            <div class="form-horizontal">
                <div class="form-group">
                    <textarea type="text" id="csv" class="form-control" rows="10" style="position: relative; vertical-align: top; background-color: transparent;" autocomplete="off" spellcheck="false" dir="auto">40021108,Sun Jun 02 2017 10:48:01 GMT+1000 (AEST),Sun Jun 04 2017 16:48:01 GMT+1000 (AEST)</textarea>
                </div>
                <button class="btn btn-sm btn-default" type="button" id="importbutton">Import</button>
            </div>
        </div>
    </div>
</div>
)
.appendTo(bar);


inject('nitc/edit.js');
