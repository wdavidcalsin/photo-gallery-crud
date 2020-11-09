import mongoose, { connect } from "mongoose";

export async function startConnection() {
   await connect(
      "mongodb+srv://wdavid:wdavid@cluster0.udnsh.mongodb.net/photo-gallery?retryWrites=true&w=majority",
      {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useFindAndModify: false,
      }
   );

   console.log("Dtabase this connect");
}
