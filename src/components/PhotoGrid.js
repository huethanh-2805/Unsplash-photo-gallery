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
            // Fetch ảnh từ Unsplash
            const response = await axios.get(`https://api.unsplash.com/photos`, {
                params: {page, per_page:12, client_id: accessKey}  // Sử dụng tham số "page"
            });

            if (response.data.length === 0) {
                setHasmore(false); // No more photos to load
            } else {
                setPhotos(prev => [...prev, ...response.data]); // Lưu danh sách ảnh
                setHasmore(response.data.length > 0); // Kiểm tra xem có ảnh nào để tải thêm không
            }
        } catch (error){
            console.error('Error fetching photos:', error);
        }

        setloading(false);
    };

    useEffect(() => {
        fetchPhotos(); // Mỗi khi "page" thay đổi, gọi hàm fetchPhotos để tải thêm ảnh
    }, [page]);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 
            >= document.documentElement.scrollHeight && hasMore // Nếu cuộn gần hết trang và vẫn còn dữ liệu để tải
        ) {
            setPage (prevPage => prevPage + 1); // Tăng số trang khi cuộn tới cuối
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll); // Theo dõi sự kiện cuộn
        return () => window.removeEventListener('scroll', handleScroll); // Xóa sự kiện cuộn khi không cần nữa
    }, [hasMore]);

    return (
        <>
            <div class="container">
                <div style={{ textAlign: "center" }}>
                    <h1 class="my-3">List of Photos</h1>
                </div>

                <div className="row">
                    {photos.map(photo => (
                        <div key={photo.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                            <div className="card h-100"> {/* Thêm để card có chiều cao đầy đủ */}
                                <Link to={`/photos/${photo.id}`}>
                                    <img 
                                        src={photo.urls.thumb} 
                                        alt={photo.alt_description} 
                                        className="card-img-top" 
                                        style={{ height: '200px', objectFit: 'cover' }} // Thiết lập chiều cao cho ảnh
                                    />
                                    <div className="card-body text-center">
                                        <p className="card-text">{photo.user.name}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                    {loading && 
                        <div className="text-center w-100 my-3">
                            <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                        </div>
                    }
                    {!hasMore && <p className="text-center">No more photos to load.</p>}
                </div>
            </div>
            
        </> 
    )
}

export default PhotoGrid;