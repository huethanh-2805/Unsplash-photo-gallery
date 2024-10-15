import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router";

const PhotoDetails = () => {
    const {id} = useParams();
    const [photo, setPhoto] = useState(null)

    const accessKey = '_BPCn3UPjUvvQSeTD8nUnISgpYyr-zqXvrAk4gqX7jw';

    useEffect(() => {
        const fetchPhotoDetails = async () => {
            try {
                const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
                    params: {client_id: accessKey}
                });

                setPhoto(response.data);
            } catch (error) {
                console.error('Error fetching photo details:', error);
            }
        }

        fetchPhotoDetails();
    }, [id]);

    if (!photo)
        return <p>Loading photo details...</p>;

    return (
        <div className="photo-details">
            <img src={photo.urls.full} alt={photo.alt_description}/>
            <h2>{photo.descrition || 'No description available'}</h2>
            <p>By: {photo.user.name}</p>
            <p>{photo.location?.name || 'No location available'}</p>
        </div>
    );
};

export default PhotoDetails;