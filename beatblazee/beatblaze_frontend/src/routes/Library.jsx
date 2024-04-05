import {useState,useEffect} from 'react'
import LoggedIn from '../containers/LoggedIn'
import Card from '../components/Card'
import { makeAuthenticatedGETRequest } from '../utils/serveRoutes'
import { useNavigate } from 'react-router-dom'

const Library = () => {
    const [myPlaylists, setMyPlaylists] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/playlist/get/me"
            );
            setMyPlaylists(response.data);
        };
        getData();
    }, []);
    const navigate=useNavigate();
  return (
    <>
    <LoggedIn currActive={'library'}>
        <div className="text-white text-xl font-semibold pb-4 pl-4 pt-8">My Playlists</div>
        <div className='m-8 flex gap-2.5 flex-wrap overflow-y-auto' style={{maxHeight: '65vh'}}>
        <div onClick={()=>{navigate('/likedsongs')}}>
        <Card source1='' source2='/images/likedSongs.svg' name='Liked Songs' desc=''></Card>
        </div>
           {myPlaylists.map((item) => {
                    return (
                        <Card
                            key={JSON.stringify(item)}
                            source1=''
                            source2={item.thumbnail}
                            name={item.name}
                            desc=""
                            playlistId={item._id}
                        />
                    );
                })}
        </div>
    </LoggedIn>
    </>
  )
}

export default Library
