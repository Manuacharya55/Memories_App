import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Card = ({ image, title, date, tag,_id ,handleDelete}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="relative w-56 h-80 rounded-2xl overflow-hidden cursor-pointer group">

            {/* Image */}
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Tag */}
            <span className="absolute top-4 left-4 px-3 py-1 text-xs rounded-full bg-zinc-600/80 text-white backdrop-blur-sm">
                {tag}
            </span>

            {/* Three Dot Menu */}
            <div className="absolute top-4 right-4">
                <button
                    onClick={() => setOpen(!open)}
                    className="p-2 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 transition"
                >
                    <HiOutlineDotsVertical size={18} />
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 text-sm">
                        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left"
                        onClick={()=> navigate(`/memory/${_id}`)}
                        >
                            <FiEdit2 size={14} />
                            Edit
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 hover:bg-red-50 text-red-600 w-full text-left"
                        onClick={()=> handleDelete(_id)}
                        >
                            <FiTrash2 size={14} />
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 p-4 text-white w-full">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm opacity-80">{date}</p>
            </div>
        </div>
    );
};

export default Card;
