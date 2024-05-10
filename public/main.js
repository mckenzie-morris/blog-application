const lightThemeImgSrc = 'light-mode-day-sun.svg';
const darkThemeImgSrc = 'dark-mode-night-moon.svg';

// Toggle theme
$('#theme_toggle').on('click', () => {
  // change theme from dark mode to light mode
  if ($('html').attr('data-bs-theme') === 'dark') {
    $('html').removeAttr('data-bs-theme');
    $('html').attr('data-bs-theme', 'light');
    $('#theme_toggle_img').removeAttr('src');
    $('#theme_toggle_img').attr('src', darkThemeImgSrc);
    return;
  }
  // change theme from light mode to dark mode
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

$('#submit_post_form').on('submit', (event) => {
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

// The anonymous function below is the most up to date version of $(document).ready()
$(() => {
  /* instantiate a variable, 'postIndexDelete' to store the index of the post corresponding
  to the clicked delete button */
  let postIndexDelete;
  $('.delete_button').on('click', function () {
    postIndexDelete = $(this).data('post_index_delete');
  });
  $('#delete_confirmed').on('click', function () {
    /* The .data() method in jQuery is primarily used to access and manipulate 
    data-* attributes in HTML elements. These attributes allow you to store custom 
    data associated with elements. */
    const deletePostFunc = async (postIndexDelete) => {
      try {
        const response = await fetch(`/delete_post/${postIndexDelete}`, {
          method: 'DELETE',
        });
        // returns True if status_code is less than 400, otherwise False.
        if (response.ok) {
          console.log('delete successful');
          /* window.location.href property returns the URL of the current page.
          window.location.href is being used to redirect after successfully deleting 
          the post */
          window.location.href = '/';
        } else {
          console.log('Failed to delete post');
        }
      } catch (error) {
        console.log('Delete post failed!');
      }
    };
    deletePostFunc(postIndexDelete);
  });
  ///////////////////////////////////////////////////////////////////////////

  $('.edit_button').on('click', function () {
    let postIndexEdit = $(this).data('post_index_edit');
    const editPostFunc = async (postIndexEdit) => {
      try {
        const response = await fetch(`/edit_post/${postIndexEdit}`, {
          method: 'GET',
        });

        // returns True if status_code is less than 400, otherwise False.
        if (response.ok) {
          console.log('edit successful');
          // Parse the JSON data from the response body
          const responseData = await response.json();

          // Access the the parsed data
          const postTitle = responseData.postTitle;
          const postContent = responseData.postContent;
          const postDate = responseData.postDate;

          $('#edit_area').val(postContent);
          $('#edit_input').val(postTitle);

        } else {
          console.log('Failed to edit post');
        }
      } catch (error) {
        console.log('edit post failed!');
      }
    };
    editPostFunc(postIndexEdit);
  });
    ///////////////////////////////////////////////////////////////////////////
});

// change the color of the delete icon when hover over it
$('.delete_button').on('mouseenter', () => {
  $('.trash_icon').attr('src', 'delete-trash-can-dark.svg');
});
$('.delete_button').on('mouseleave', () => {
  $('.trash_icon').attr('src', 'delete-trash-can.svg');
});

// change the color of the edit icon when hover over it
$('.edit_button').on('mouseenter', () => {
  $('.pencil_icon').attr('src', 'edit-pencil-dark.svg');
});
$('.edit_button').on('mouseleave', () => {
  $('.pencil_icon').attr('src', 'edit-pencil.svg');
});
