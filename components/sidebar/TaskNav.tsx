import Link from 'next/link';

export default function TaskNav() {
  return (
    <aside className="sidebar-left">
        <div className="sidebar-section">
            <h3>Discover</h3>
            <ul>
                <li className="active"><span className="icon">🔥</span> Trending</li>
                <li><span className="icon">✨</span> Latest</li>
                <li><span className="icon">🏆</span> Leaderboards</li>
                <li><span className="icon">📚</span> Collections</li>
            </ul>
        </div>
        <div className="sidebar-section">
            <h3>Research Topics</h3>
            <div className="topic-tags">
                <span className="tag">Large Language Models</span>
                <span className="tag">Computer Vision</span>
                <span className="tag">Reinforcement Learning</span>
                <span className="tag">Multimodal</span>
                <span className="tag">Robotics</span>
                <span className="tag">Audio Generation</span>
            </div>
        </div>
    </aside>
  );
}
