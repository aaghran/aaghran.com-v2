import { writings } from '../data'

export default function Writing() {
  return (
    <div className="fade-in section">
      <h2><i className="fa-solid fa-feather text-accent icon-md"></i> Writing</h2>
      <p className="page-desc">Thoughts on AI agents, product logic, and travel stories from around the world.</p>

      <div className="writing-section">
        <div className="article-grid">
          {writings.map((w, i) => (
            <a href={w.url} className="article-card project-card" key={i} target="_blank" rel="noreferrer">
              {w.image && (
                <div className="article-card-inner">
                  <div className="article-image" style={{ backgroundImage: `url(${w.image})` }}></div>
                </div>
              )}
              <div className="article-content">
                <h3 className="writing-title">{w.title}</h3>
                <span className="writing-meta" style={{marginTop: '0.75rem', display: 'block'}}>{w.meta}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="all-writing" style={{marginTop: '3rem'}}>
          <a href="https://aaghran.substack.com" target="_blank" rel="noreferrer" className="all-writing-link">All writing <i className="fa-solid fa-arrow-right icon-sm"></i></a>
        </div>
      </div>
    </div>
  )
}
