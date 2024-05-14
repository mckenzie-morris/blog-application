import express from 'express';

const app = express();
const port = 3000;
let postArray = [];

// serve static files from 'public' folder in root directory
app.use(express.static('public'));

// serve static files from 'node_modules' folder in root directory
app.use('/node_modules', express.static('node_modules'));

// parse URL-encoded data submitted by forms (makes accessible through req.body)
app.use(express.urlencoded({ extended: true }));

// render index.ejs to root route with post data (if any)
app.get('/', (req, res) => {
  return res.status(200).render('index.ejs', { data: postArray });
});

/* (when 'Post!' button is clicked) generate a date, gather post data from request body, 
save data on 'postData' obj and push to 'postArray', then redirect to root route when the 
'Post!' button is clicked */
app.post('/submit_post', (req, res) => {
  const submitDate = new Date();

  const postData = {
    title: req.body.postTitle,
    content: req.body.postContent,
    date: submitDate,
  };

  postArray.push(postData);
  return res.status(200).redirect('/');
});

/* (when edit button is clicked) pull post index from fetch request made from frontend 
('main.js'), send the object from the 'postArray' at the corresponding index formatted as 
a JSON string back to the frontend as the response */
app.get('/edit_post/:postIndex', (req, res) => {
  const postIndex = req.params.postIndex;

  return res.status(200).json({
    postContent: postArray[postIndex].content,
    postTitle: postArray[postIndex].title,
    postDate: postArray[postIndex].date,
  });
});

/* (when 'Save changes!' button is clicked) pull data from request body, generate a new date
('editDate'), iterate thru keys of object in 'postArray' at corresponding index and replace
values that have been updated, then redirect to root route */
app.post('/edit_submit', (req, res) => {
  const currentIdx = req.body.editIdx;
  const editDate = new Date();
  const editData = {
    title: req.body.editTitle,
    content: req.body.editContent,
    editDate: editDate,
  };
  for (let key in editData) {
    postArray[currentIdx][key] = editData[key];
  }
  return res.status(200).redirect('/');
});

/* (when delete button is clicked) pull post index from fetch request made from frontend 
('main.js'), splice the 'postArray' at the corresponding index */
app.delete('/delete_post/:idx', (req, res) => {
  const postIndex = req.params.idx;
  postArray.splice(postIndex, 1);
  return res.sendStatus(204);
});

// Any route not defined is 404'ed
app.use('*', (req, res) => {
  return res.status(404).send('404: Page not found- you silly goose');
});

// Global Error Handler
app.use((error, req, res, next) => {
  const defaultMessage = 'Uh-oh SpaghettiOs (something went wrong)!';
  const message = error.message || defaultMessage;
  console.log(message);
  return res.status(500).send(message);
});

// Server on Port 3000
app.listen(3000, () => {
  return console.log('Server listening on port 3000');
});
