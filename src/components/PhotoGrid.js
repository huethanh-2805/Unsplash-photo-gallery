import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PhotoGrid = () => {
    const [photos,setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setloading] = useState(false);
    const [hasMore, setHasmore] = useState(true);

    const accessKey = '_BPCn3UPjUvvQSeTD8nUnISgpYyr-zqXvrAk4gqX7jw';

    const fetchPhotos = async () => {
        if (loading)
            return;

        setloading(true);

        try {
            const response = await axios.get(`https://api.unsplash.com/photos`, {
                params: {page, per_page:12, client_id: accessKey}
            });

            setPhotos(prev => [...prev, ...response.data]);
            setHasmore(response.data.length > 0);
        } catch (error){
            console.error('Error fetching photos:', error);
        }

        setloading(false);
    };

    useEffect(() => {
        fetchPhotos();
    }, [page]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 
            >= document.documentElement.scrollHeight && hasMore
        ) {
            setPage (prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    return (
        <div className="photo-grid">
           {photos.map(photo => (
            <div key={photo.id} className="photo-item">
                <Link to={`/photos/${photo.id}`}>
                <img src={photo.urls.thumb} alt={photo.alt_description} />
                <p>{photo.user.name}</p>
                </Link>
            </div>
           ))}
            {loading && <p>Loading more photos...</p>}
        </div>
    )
}

export default PhotoGrid;