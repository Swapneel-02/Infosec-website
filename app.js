const express = require('express');
const mongoose = require('mongoose');
const path=require('path')
// const submit=require("./connect");


const app = express();

// Define the MongoDB connection URL
const db = 'mongodb+srv://saisubrat9:Subrat@cluster0.c9lajty.mongodb.net/infosec?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server only after successful MongoDB connection
    app.listen(2000);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Create a mongoose schema for event cards
const eventSchema = new mongoose.Schema({
  eventname: String,
  about: String,
  imglink: String,
  reglink: String,
});
const Eschema = new mongoose.Schema({
  name:String,
  email:String,
  message:String,
  
});
const Mschema = new mongoose.Schema({
  name:String,
  email:String,
  position:String,
  imglink:String,
  
});

// Create a mongoose model for event cards
const EventCard = mongoose.model('events', eventSchema);
const submit=new mongoose.model("Submit",Eschema);
const MemberCard = mongoose.model('members', Mschema);
module.exports=submit;
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Sample event data (you can fetch this data from the database as well)
// const eventsData = [
//   {
//     eventname: "Event 1",
//     about: "Description for Event 1",
//     imglink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCoWglQp0fT7DRL2gTHb271pEyhLlx9sLbA6rPZYS3JvE2ZM0a7gCoz1T0y9_pxSWMv78&s",
//     reglink: "registration_link1",
//   },
//   {
//     eventname: "Event 2",
//     about: "Description for Event 2",
//     imglink: "https://images.news18.com/ibnlive/uploads/2023/02/untitled-design-2023-02-05t123206.702.png",
//     reglink: "registration_link2",
//   }

  
// ];

// const evensData = [
//   {"name":"Subrat Kumar Swain","email":"b421055@iiit-bh.ac.in","imglink":"https://i.postimg.cc/HxmJTJFZ/SAVE-20230325-182232.jpg","position":"member"},
//   {"name":"P. Navya Preetham Reddy","email":"b121034@iiit-bh.ac.in","position":"Member","imglink":"https://i.postimg.cc/DZCtHGRR/IMG-20230719-WA0002.jpg\n"},
//   {"name":"Garvisha Bansal","email":"b221024@iiit-bh.ac.in","position":"member","imglink":"https://i.postimg.cc/fR8dpTB1/IMG-20230719-WA0005.jpg"},

  
// ];

// MemberCard.create(evensData)
//   .then(() => {
//     console.log("Event data inserted into MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error inserting event data into MongoDB:", error);
//   });
//   EventCard.create(eventsData)
//   .then(() => {
//     console.log("Event data inserted into MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error inserting event data into MongoDB:", error);
//   });

app.get('/',(req,res)=>{
    res.render('index');
  })
app.get('/events', (req, res) => {
  // Fetch event data from the database using the EventCard model
  // You can customize this query based on your requirements
  EventCard.find()
    .then((events) => {
      console.log(events);
      res.render('events', { events });
    })
    .catch((error) => {
      console.error("Error fetching event data:", error);
      res.sendStatus(500);
    });
  
});
app.get('/achievements',(req,res)=>{
  res.render('achievements');
})

app.get('/contact',(req,res)=>{
  res.render('contact')
})
app.get('/members', (req, res) => {
  // Fetch event data from the database using the EventCard model
  // You can customize this query based on your requirements
  MemberCard.find()
    .then((members) => {
      console.log(members);
      res.render('members', { members });
    })
    .catch((error) => {
      console.error("Error fetching event data:", error);
      res.sendStatus(500);
    });
  
});
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const user = new submit({
      name,
      email,
      message,
    });
    console.log(user);
    await user.save();
    console.log("Message saved successfully");
    res.status(200).redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
