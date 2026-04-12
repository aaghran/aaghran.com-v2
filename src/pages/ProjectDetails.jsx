export default function ProjectDetails({ project }) {
  return (
    <div className="fade-in">

      {/* Back */}
      <div style={{ marginBottom: '2rem' }}>
        <a href="#projects" className="all-writing-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
          <i className="fa-solid fa-arrow-left icon-sm"></i> All projects
        </a>
      </div>

      {/* Header */}
      <header className="section reveal">
        <span className="tag" style={{ display: 'inline-block', marginBottom: '1rem' }}>{project.tag}</span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-main)', lineHeight: 1.15 }}>{project.title}</h1>
        {project.lede && (
          <p className="subtitle" style={{ fontSize: '1.15rem', color: 'var(--text-lighter)', maxWidth: '640px', lineHeight: 1.6 }}>
            {project.lede}
          </p>
        )}

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="cta-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              Visit site <i className="fa-solid fa-arrow-up-right-from-square icon-sm"></i>
            </a>
          )}
          {project.isComingSoon && (
            <span className="cta-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', cursor: 'default' }}>
              Join waitlist <i className="fa-solid fa-arrow-right icon-sm"></i>
            </span>
          )}
        </div>
      </header>

      <hr className="divider reveal" />

      {/* Story */}
      {project.story && (
        <section className="section reveal">
          {project.story.split('\n\n').map((para, i) => (
            <p key={i} style={{ color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '680px', marginBottom: '1.25rem' }}>
              {para.trim()}
            </p>
          ))}
        </section>
      )}

      {/* Stack */}
      {project.stack && project.stack.length > 0 && (
        <>
          <hr className="divider reveal" />
          <div className="section reveal">
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Stack</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.stack.map((tech, i) => (
                <span key={i} className="tag" style={{ fontSize: '0.8rem' }}>{tech}</span>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Screenshots */}
      {project.screenshots && project.screenshots.length > 0 && (
        <>
          <hr className="divider reveal" />
          <section className="section reveal">
            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {project.screenshots.map((img, i) => (
                <img src={img} alt={`${project.title} screenshot ${i+1}`} key={i} style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border-color)' }} />
              ))}
            </div>
          </section>
        </>
      )}

    </div>
  );
}
