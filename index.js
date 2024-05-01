import express from 'express';

const app = express();
const port = 3000;
let idx = 0;
let postArray = [];

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index.ejs', { data: postArray });
});

// Use closure function to track index of Post Objs Array
// If length of Array is greater than 0, show accordion
// 'Remove Post Button' decrements index and removes Obj from Array

app.post('/submit_post', (req, res) => {
  if (req.body.postTitle.length === 0 || req.body.postTitle.length >= 100) {
    return;
  }

  const dateObj = new Date();
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const submitDate = `${month}/${day}/${year}`;

  const postData = {
    title: req.body.postTitle,
    content: req.body.postContent,
    date: submitDate,
    idx: ++idx,
  };

  postArray.push(postData);
  res.redirect('/');
});

// Any route not defined is 404'ed
app.use('*', (req, res) => {
  res.status(404).send('404: Page not found- you silly goose');
});

// Global Error Handler
app.use((error, req, res, next) => {
  const defaultMessage = 'Uh-oh, something went wrong';
  const message = error.message || defaultMessage;
  console.log(message);
  res.status(500).send(message);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
