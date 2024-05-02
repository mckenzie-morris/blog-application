import express from 'express';

const app = express();
const port = 3000;
let postArray = [];

// serve static files from 'public' folder in root directory
app.use(express.static('public'));

// serve static files from 'node_modules' folder in root directory
/* when req comes in for a resource under '/node_modules' route, it 
will be sought by Express within the node_modules folder */
app.use('/node_modules', express.static('node_modules'));
app.use(express.urlencoded({ extended: true }));

// render index.ejs to root route with post data (if any)
app.get('/', (req, res) => {
  res.render('index.ejs', { data: postArray });
});

/* generate a date, gather post data from req.body, save data on 'postData' obj 
and push to 'postArray', then redirect to root route when the 'Post!' button is clicked */
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
  };

  postArray.push(postData);
  res.redirect('/');
});

/*Use splice() method to remove postArray entry corresponding to matching delete button,
then redirect to root route */
app.delete('/delete_post', (req, res) => {

})

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
