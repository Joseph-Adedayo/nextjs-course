import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from 'next/Router';

function NewMeetupPage()
{
   const router = useRouter();

    async function addMeetupHandler(enteredMeetupData)
    {
       
        console.log(data);
        const response = await fetch ('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json '
            }
        });

        const data = await response.json();
        console.log(data);
        router.push('/');
       
    }

   return <NewMeetupForm  onAddMeetup={addMeetupHandler}/>
}

export default NewMeetupPage;