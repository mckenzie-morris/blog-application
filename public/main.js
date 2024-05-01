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

$('#close_button_X').on('click', () => {
  $('#modal_input').val(null);
  $('#text_content').val(null);
});

$('#close_modal_button').on('click', () => {
  $('#modal_input').val(null);
  $('#text_content').val(null);
});

$('#post_submit_button').on('click', () => {
  if ($('#modal_input').val().length === 0) {
    alert('Please enter a valid post title');
  }
});

if ($('#modal_input').val().length >= 100) {
  alert('Title may not be greater than 100 characters');
}
