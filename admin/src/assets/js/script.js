/// <reference path="./jquery-3.4.1.js" />
/// <reference path="./jquery-ui.js" />
/* eslint-env jquery */

function makeSortable(id) {
  $(id).sortable();
  $(id).disableSelection();
}
