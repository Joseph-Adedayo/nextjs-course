
import {MongoClient} from 'mongodb';
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";


function HomePage(props)
{   
    return( <>
   <Head>
    <title> React Meetups </title>
    <meta name="description"
    content = " React components" />
   </Head>
     <MeetupList meetups={props.meetups}/>
    </>
    )
}

export async function getStaticProps() {
  

    const client = await MongoClient.connect('mongodb+srv://yemi2002:45xzRz3XgH7NgKP8@cluster0.rxttguz.mongodb.net/?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close()
    
    return {
        props: {
        meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
    }))
    
    },
    revalidate: 1
};

};
export default HomePage;