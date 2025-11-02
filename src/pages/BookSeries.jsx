import { useState, useEffect } from 'react';
import voyagesOne from "/voyages1.png";
import voyagesTwo from "/voyages2.jpg";
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SailingIcon from '@mui/icons-material/Sailing';

const BookSeries = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const books = [
        {
            id: 1,
            title: "The Voyages of Victora: Volume One",
            image: voyagesOne,
            description: `Captain Bartley, a charming and adventurous gentleman, leads his eclectic crew on a daring quest across the high seas. With his loyal first mate, a mysterious fish-man, and the formidable crew. Captain Bartley embarks on an unforgettable journey filled with danger, excitement, betrayal.

      As the crew faces the challenges of treacherous waters and formidable foes, they must rely on their wits, and bonds to succeed. "The Voyages of Victora" is a swashbuckling adventure that captures the spirit of exploration and the thrill of the hunt. Join Captain Bartley and his crew as they navigate the perils of the sea in pursuit of glory and fortune.`,
            available: true,
            link: "https://a.co/d/3xSFLnp",
            status: "Available Now"
        },
        {
            id: 2,
            title: "The Voyages of Victora: Volume Two",
            image: voyagesTwo,
            description: `Captain Bartley allows one of his young crew members to visit home, a place now hidden from the world, a place of myth and conspiracy. Join the crew on their enlightening adventure.

      In this thrilling sequel, the crew faces new challenges and discovers ancient secrets that will test their loyalty and courage like never before. The journey continues with more action, mystery, and the bonds of friendship that make the Victora's crew legendary.`,
            available: false,
            link: "https://a.co/d/3xSFLnp",
            status: "Coming This Christmas!",
            releaseDate: "December 2024"
        }
    ];

    return (
        <div className="book-series-page">
            <div className="container">
                <div className="page-header">
                    {/* <SailingIcon className="title-icon" /> */}
                    <br />
                    <h1 className="page-title">Book Series</h1>
                    <p className="page-subtitle">Embark on the complete adventure across the high seas</p>
                </div>

                <div className="books-grid">
                    {books.map((book) => (
                        <div key={book.id} className={`book-card ${!book.available ? 'coming-soon' : ''}`}>
                            <div className="book-card-content">
                                <div className="book-image-section">
                                    <img src={book.image} alt={book.title} className="book-image" />
                                    {!book.available && (
                                        <div className="coming-soon-badge">
                                            {/* <CalendarTodayIcon />
                                            <span>Coming Soon</span> */}
                                        </div>
                                    )}
                                </div>

                                <div className="book-info">
                                    <h3>{book.title}</h3>

                                    <div className="book-status">
                                        <span className={`status-badge ${book.available ? 'available' : 'coming-soon'}`}>
                                            {book.status}
                                        </span>
                                        {book.releaseDate && (
                                            <span className="release-date">{book.releaseDate}</span>
                                        )}
                                    </div>

                                    <p className="book-description">
                                        {book.description}
                                    </p>

                                    <div className="book-actions">
                                        {book.available ? (
                                            <a
                                                href={book.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary"
                                            >
                                                <ShoppingBasketOutlinedIcon />
                                                {isMobile ? 'Get Paperback' : 'Get Paperback on Amazon'}
                                            </a>
                                        ) : (
                                            <button className="btn btn-disabled" disabled>
                                                <CalendarTodayIcon />
                                                {isMobile ? 'Coming Soon' : book.status}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <br />
                        </div>
                    ))}
                </div>

                {/* Series Info Section */}
                <div className="series-info">
                    <div className="info-card">
                        <h3>About the Series</h3>
                        <p>
                            "The Voyages of Victora" is an epic pirate fantasy series that takes readers on an unforgettable journey across treacherous seas, mysterious islands, and into the heart of adventure. Each volume builds upon the last, creating a rich, interconnected world filled with memorable characters and thrilling plotlines.
                        </p>
                    </div>

                    <div className="info-card">
                        <h3>What to Expect</h3>
                        <ul className="features-list">
                            <li>🏴‍☠️ Swashbuckling pirate action</li>
                            <li>🧙‍♂️ Mystical creatures and magic</li>
                            <li>🗺️ Uncharted islands and ancient ruins</li>
                            <li>🤝 Deep character relationships</li>
                            <li>⚔️ High-stakes adventure</li>
                            <li>💫 Coming of age stories</li>
                        </ul>
                    </div>
                    <br />
                    <br />
                </div>
            </div>
        </div>
    );
};

export default BookSeries;