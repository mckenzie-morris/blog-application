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

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

/* 

1.) postArray = [];

2.) postArray = [{title: xxx, content: xxx, date: xxxx, idx: xxx}]

3.) {data: postArray} = {data: [{title: xxx, content: xxx, date: xxxx, idx: xxx}, ...]}

*/
