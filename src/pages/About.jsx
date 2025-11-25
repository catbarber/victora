import { useState, useEffect } from 'react';
import SailingIcon from '@mui/icons-material/Sailing';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import HistoryIcon from '@mui/icons-material/History';
import LinkIcon from '@mui/icons-material/Link';

const About = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className="about-page">
            <div className="container">
                {/* Header Section */}
                <div className="page-header">
                    {/* <SailingIcon className="title-icon" /> */}
                    <br /><br />
                    <h1 className="page-title">About The Voyages of Victora</h1>
                    <p className="page-subtitle">Discover the world behind the adventure</p>
                </div>

                {/* The Story Section */}
                <section className="about-section">
                    <div className="section-header">
                        <HistoryIcon className="section-icon" />
                        <h2>The Story</h2>
                    </div>
                    <div className="section-content">
                        <p>
                            "The Voyages of Victora" is an epic pirate fantasy series that follows the adventures of Captain Bartley and his diverse crew aboard the legendary ship, Victora. Set in a world of high seas adventure, mysterious islands, and ancient magic, each volume brings new challenges and discoveries that test the crew's courage, loyalty, and determination.
                        </p>
                        <p>
                            From treacherous waters to hidden civilizations, the series explores themes of friendship, discovery, and the eternal human spirit of adventure. The Victora's crew represents a tapestry of backgrounds and personalities, each bringing unique strengths to their shared journey.
                        </p>
                    </div>
                </section>

                {/* The Author Section */}
                <section className="about-section">
                    <div className="section-header">
                        <PersonIcon className="section-icon" />
                        <h2>The Author</h2>
                    </div>
                    <div className="section-content">
                        <div className="author-card">
                            <div className="author-info">
                                <h3>Christopher Feveck</h3>
                                <p>
                                    Christopher Feveck is a passionate storyteller who brings to life the thrilling world of pirates, adventure, and fantasy. With a background in creative writing and a lifelong love for seafaring tales, Christopher has created a rich universe that captures the imagination of young adults and fantasy enthusiasts alike.
                                </p>
                                <p>
                                    His writing combines meticulous world-building with fast-paced adventure, creating stories that are both immersive and exciting. Christopher's dedication to character development and plot craftsmanship ensures that each volume in the series builds upon the last, creating a satisfying and expansive narrative experience.
                                </p>
                                <div className="author-links">
                                    <a
                                        href="https://chris-feveck.web.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="author-link"
                                    >
                                        <LinkIcon />
                                        <span>Visit chris-feveck.com</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The World Section */}
                <section className="about-section">
                    <div className="section-header">
                        <PublicIcon className="section-icon" />

                        <h2>The World</h2>
                    </div>
                    <div className="section-content">
                        <p>
                            The world of Victora is a vast and mysterious place, filled with wonders and dangers at every turn. Here's what awaits you:
                        </p>

                        <div className="world-features">
                            <div className="feature-grid">
                                <div className="feature-card">
                                    <div className="feature-icon">🏝️</div>
                                    <div className="feature-content">
                                        <h4>Mysterious Islands</h4>
                                        <p>Shrouded in legend and hidden from common maps, each island holds its own secrets and challenges.</p>
                                    </div>
                                </div>

                                <div className="feature-card">
                                    <div className="feature-icon">🧜‍♂️</div>
                                    <div className="feature-content">
                                        <h4>Ancient Sea Creatures</h4>
                                        <p>From mythical beings to forgotten monsters of the deep, the seas are alive with wonder and danger.</p>
                                    </div>
                                </div>

                                <div className="feature-card">
                                    <div className="feature-icon">🗺️</div>
                                    <div className="feature-content">
                                        <h4>Hidden Treasures</h4>
                                        <p>Treacherous waters conceal lost artifacts and fortunes waiting to be discovered by brave adventurers.</p>
                                    </div>
                                </div>

                                <div className="feature-card">
                                    <div className="feature-icon">🌍</div>
                                    <div className="feature-content">
                                        <h4>Diverse Cultures</h4>
                                        <p>Forgotten civilizations and unique societies with their own customs, technologies, and mysteries.</p>
                                    </div>
                                </div>

                                <div className="feature-card">
                                    <div className="feature-icon">⚡</div>
                                    <div className="feature-content">
                                        <h4>Ancient Magic</h4>
                                        <p>Power that flows through the very seas themselves, waiting to be harnessed or feared.</p>
                                    </div>
                                </div>

                                <div className="feature-card">
                                    <div className="feature-icon">⚔️</div>
                                    <div className="feature-content">
                                        <h4>Naval Battles</h4>
                                        <p>Epic sea combat between rival ships, sea monsters, and the unpredictable forces of nature.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Series Timeline */}
                <section className="about-section">
                    <div className="section-header">
                        <SailingIcon className="section-icon" />
                        <h2>The Journey Continues</h2>
                    </div>
                    <div className="section-content">
                        <div className="timeline">
                            <div className="timeline-item">
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <h4>Volume One</h4>
                                    <p>The adventure begins as Captain Bartley assembles his crew and sets sail on their first major quest.</p>
                                </div>
                            </div>

                            <div className="timeline-item">
                                <div className="timeline-marker upcoming"></div>
                                <div className="timeline-content">
                                    <h4>Volume Two</h4>
                                    <p>New mysteries unfold as the crew explores hidden lands and faces unexpected challenges.</p>
                                </div>
                            </div>

                            <div className="timeline-item">
                                <div className="timeline-marker future"></div>
                                <div className="timeline-content">
                                    <h4>Future Volumes</h4>
                                    <p>The saga continues with more adventures, character development, and world-expanding stories.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;