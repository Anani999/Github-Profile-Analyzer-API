import express from 'express';
import dotenv from 'dotenv';
import pool from './db.js';

const app = express();
dotenv.config();

app.use(express.json());

app.get('/api/user', async (req, res) => {
 try {
  const [rows] = await pool.query('SELECT * FROM users');
  res.status(200).json({ success: true, data: {users:rows} });
 } catch(error) {
  console.log('Server error : ', error.message);
  res.status(500).json({ success: false, message: 'Server error'});
 }
});

app.get('/api/user/:username', async (req, res) => {
 try{
  const username = req.params.username;
  if(!username) {
   return res.status(400).json({ success: false, message: 'username is required'});
  }
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );

  //console.log('DB query : ', rows);
  if(rows.length > 0) {
   return res.status(200).json({ success: true, data: {user:rows[0]} });
  }
  const response = await fetch('https://api.github.com/users/'+username);
  if(response.status === 404) {
   return res.status(404).json({ success: false, message: 'No users found' });
  }
  const result = await response.json();
  const createdAt = new Date(result.created_at)
   .toISOString()
   .slice(0, 19)
   .replace('T', ' ');

  await pool.execute(
   'INSERT INTO users (id, username, avatar_url, html_url, name, location, bio, public_repos, followers, following, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ',
    [result.id, result.login, result.avatar_url, result.html_url, result.name, result.location, result.bio, result.public_repos, result.followers, result.following, createdAt ]
  );
  res.status(200).json({ success: true, message: 'fetched user successfully !', data: result });
 
 }catch(error){
  console.log('Error while fetching user : ', error.message);
  return res.status(500).json({ success: false, message: 'Internal server error'});
 }
});


app.listen(5000, () => { console.log('Listening on port : 5000')} );
