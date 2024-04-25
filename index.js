import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/submit_post', (req, res) => {
  const dateObj = new Date();
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const submitDate = `${day}/${month}/${year}`;

  const postData = {
    title: req.body.postTitle,
    date: submitDate,
  };
  res.render('index.ejs', postData);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

/* 
-'CREATE NEW POST' button positioned at the top ==> click on button,
 expands/opens two text editors/input boxes with 'POST' button and 'CLEAR' button

 -1st input box is for title

 -'CLEAR' button ==> deletes everything within box

 -'POST' button ==> will close input boxes, add the post to the list of posts, along with
 the date it was created, and to the top of the list
*/

/*
-Click on a post (will show title and date created in list), have option to edit or
delete from list
*/

/* Click button =>  */
