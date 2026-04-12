export default function ProjectDetails({ project }) {
  return (
    <div className="fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <a href="#projects" className="all-writing-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
          <i className="fa-solid fa-arrow-left icon-sm"></i> Back to library
        </a>
      </div>

      <header className="section reveal">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{project.title}</h1>
        <span className="tag" style={{ display: 'inline-block', marginBottom: '1.5rem' }}>{project.tag}</span>
        
        <p className="subtitle" style={{ fontSize: '1.25rem', color: 'var(--text-lighter)' }}>
          {project.description}
        </p>
      </header>

      <hr className="divider reveal" />

      {project.content && (
        <section className="section reveal" style={{ marginBottom: '2rem' }}>
           <h2 style={{ marginBottom: '1rem' }}>Project Overview</h2>
           <p style={{ color: 'var(--text-muted)' }}>{project.content}</p>
        </section>
      )}

      {project.screenshots && project.screenshots.length > 0 && (
      <section className="section reveal">
         <h2 style={{ marginBottom: '1.5rem' }}>Gallery</h2>
         <div className="gallery-grid" style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {project.screenshots.map((img, i) => (
              <img src={img} alt={`${project.title} screenshot ${i+1}`} key={i} style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border-color)' }} />
            ))}
         </div>
      </section>
      )}
    </div>
  );
}
