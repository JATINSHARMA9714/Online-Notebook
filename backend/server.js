const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
//appConfigs
const app=express();
const port= process.env.PORT||8000;


//Middlewares
app.use(express.json());
app.use(cors());


//dbConfig

const connectionUrl='mongodb+srv://admin:MKFzqk0vKfKd7cYD@notebook.tnwbchl.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(connectionUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.once('open', function(err, resp){
    console.log("DB Connected");
  });
//apiEndpoints
app.use('/api/user' ,require('./routes/user'));
app.use('/api/notes',require('./routes/notes'));

//listeners
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })