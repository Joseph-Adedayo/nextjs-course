
import MeetupDetail from '../../components/meetups/MeetupDetail'
import {MongoClient, ObjectId} from 'mongodb';

function MeetupDetails  (props)
{
  return (
 <>
 <MeetupDetail image={props.meetupData.image}
   title = {props.meetupData.title}
   address= {props.meetupData.address}
   description= {props.meetupData.des}
 
 />
 
 </>
  )
}

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://yemi2002:45xzRz3XgH7NgKP8@cluster0.rxttguz.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

    client.close()


  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
     params: {meetupId: meetup._id.toString()}})),

      }
    }

export async function getStaticProps(context) {

  const meetupId = new ObjectId(context.params.meetupId)

  const client = await MongoClient.connect('mongodb+srv://yemi2002:45xzRz3XgH7NgKP8@cluster0.rxttguz.mongodb.net/?retryWrites=true&w=majority');
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const selectMeetup = await meetupsCollection.findOne({_id: meetupId});

  client.close()

  return {props: {meetupData: {
    
    _id: selectMeetup._id.toString(),
    title: selectMeetup.title,
    image: selectMeetup.image,
    description: selectMeetup.description,
    address: selectMeetup.address,
  }}
    
}
};



export default MeetupDetails;