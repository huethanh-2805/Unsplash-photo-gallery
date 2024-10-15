import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const PhotoDetails = () => {
    const {id} = useParams(); // Lấy ID từ URL
    const [photo, setPhoto] = useState(null)
    const accessKey = '_BPCn3UPjUvvQSeTD8nUnISgpYyr-zqXvrAk4gqX7jw';
    const navigate = useNavigate(); // khởi tạo navigate

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
        
    return (
        <>
            <div style={{ textAlign: "center" }}>
                <h1>Detail of Photo</h1>
            </div>
            
            <div className="container my-4">
                {photo ? (
                    <div className="card text-center">
                        <img src={photo.urls.full} className="card-img-top" alt={photo.alt_description} />
                        <div className="card-body">
                            <h2 className="card-title">{photo.title || 'No title available'}</h2> {/* Tiêu đề ảnh, nếu có */}
                            <p className="card-text"><strong>By:</strong> {photo.user.name}</p>
                            <p><strong>Description:</strong> {photo.description || 'No description available'}</p> {/* Mô tả ảnh, nếu có */}
                        </div>
                    </div>
                ) : (
                    <div class="text-center">
                        <button class="btn btn-primary" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading photo details...
                        </button>
                    </div>
                )}
            </div>

            {/* Nút quay lại (Sticky Button) */}
            <button 
                type="button" 
                className="sticky-button" 
                onClick={() => navigate(-1)}
            >
                <i className="fas fa-arrow-left"></i> Go Back
            </button>
        </>
    );
};

export default PhotoDetails;