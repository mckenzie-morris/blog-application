// It is not necessary to import jQuery
/* 
There are two main module systems in JavaScript: CommonJS and ES6 modules.
using import statements in ES6 modules, the JavaScript runtime loads the module and evaluates 
its contents. 
ES6 modules use strict mode by default, and they have their own scope, meaning that variables 
and functions defined within a module are not accessible outside of it unless explicitly 
exported.
jQuery, however, is not designed to be used as an ES6 module. It's traditionally used as a 
global variable ($ or jQuery) that is accessible throughout your JavaScript code without 
needing to import it explicitly. This is achieved by including the jQuery library in your 
HTML file using a <script> tag.
when you include jQuery using a <script> tag in your HTML file, it becomes available globally, 
and you can use it directly in your JavaScript code without needing to import it using ES6 
module syntax.
*/


$('#light_option').on('click', () => {
  if ($('html').attr('data-bs-theme') === 'dark') {
    $('html').removeAttr('data-bs-theme');
    $('html').attr('data-bs-theme', 'light');
  }
});

$('#dark_option').on('click', () => {
  if ($('html').attr('data-bs-theme') === 'light') {
    $('html').removeAttr('data-bs-theme');
    $('html').attr('data-bs-theme', 'dark');
  }
});
