const lightThemeImgSrc = 'light-mode-day-sun.svg';
const darkThemeImgSrc = 'dark-mode-night-moon.svg';

$('#theme_toggle').on('click', () => {
  if ($('html').attr('data-bs-theme') === 'dark') {
    $('html').removeAttr('data-bs-theme');
    $('html').attr('data-bs-theme', 'light');
    $('#theme_toggle_img').removeAttr('src');
    $('#theme_toggle_img').attr('src', darkThemeImgSrc);
    return;
  }
  if ($('html').attr('data-bs-theme') === 'light') {
    $('html').removeAttr('data-bs-theme');
    $('html').attr('data-bs-theme', 'dark');
    $('#theme_toggle_img').removeAttr('src');
    $('#theme_toggle_img').attr('src', lightThemeImgSrc);
    return;
  }
});

// if user clicks X button, clear Title and Content fields of Modal
$('#close_button_X').on('click', () => {
  $('#modal_input').val(null);
  $('#text_content').val(null);
});

// if user clicks 'Close' button, clear Title and Content fields of Modal
$('#close_modal_button').on('click', () => {
  $('#modal_input').val(null);
  $('#text_content').val(null);
});

/* if user clicks 'Post!' button (form submit) and one of the following conditions are met;

  1.) Title field is blank
  2.) Title field consists only of spaces
  3.) Title field is greater than or equal to 100 characters
  4.) Post content is blank
  5.) Post content consists only of spaces

  form submission will be prevented

*/

// regex to test if string only consists of tabs spaces
const regex = /^ *$/;

$('form').on('submit', (event) => {
  if (
    $('#modal_input').val().length === 0 ||
    $('#text_content').val().length === 0 ||
    $('#modal_input').val().length >= 100 ||
    regex.test($('#modal_input').val()) ||
    regex.test($('#text_content').val())
  )
    event.preventDefault();
  return;
});

/* if user clicks 'Post!' button and one of the following conditions are met;

  1.) Title field is blank
  2.) Title field consists only of spaces
  3.) Title field is greater than or equal to 100 characters
  4.) Post content is blank
  5.) Post content consists only of spaces

  An alert will be sent to the user

*/
$('#post_submit_button').on('click', () => {
  if ($('#modal_input').val().length === 0) {
    alert('Title field may not be blank');
    return;
  }
  if (regex.test($('#modal_input').val())) {
    alert('Title field may not consist of just spaces');
    return;
  }
  if ($('#text_content').val().length === 0) {
    alert('Post content may not be blank');
    return;
  }
  if (regex.test($('#text_content').val())) {
    alert('Post content may not consist of just spaces');
    return;
  }
  if ($('#modal_input').val().length >= 100) {
    alert('Title may not be greater than 100 characters');
    return;
  }
});

// if user types a Title that is 100 or more characters, alert is sent
$('#modal_input').on('keypress', () => {
  if ($('#modal_input').val().length >= 100) {
    alert('Title may not be greater than 100 characters');
    return;
  }
});
