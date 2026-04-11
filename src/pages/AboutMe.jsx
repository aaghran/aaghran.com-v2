import { useEffect, useState } from 'react';
import { projects, writings, workExperience } from '../data'



export default function AboutMe({ setActiveTab }) {
  const currentJob = workExperience[0];

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <header className="section hero reveal">
        <div className="hero-content-wrapper">
          <div className="hero-text">
            <h1>Aaghran Ghosh</h1>
            <p className="subtitle" style={{ whiteSpace: 'pre-line' }}>
              I scope and build the AI layer.<br/>
              MCP integrations, agentic pipelines, NLS features — and the product thinking around them.
            </p>
            <nav className="social-nav">
              <a href="https://linkedin.com/in/aaghran" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin icon-sm"></i></a>
              <a href="https://github.com/aaghran" target="_blank" rel="noreferrer"><i className="fa-brands fa-github icon-sm"></i></a>
              <a href="https://wanderingbong.com" target="_blank" rel="noreferrer"><i className="fa-solid fa-compass icon-sm"></i></a>
              <a href="https://aaghran.substack.com" target="_blank" rel="noreferrer"><i className="fa-solid fa-pen-nib icon-sm"></i></a>
              <a href="https://medium.com/@aaghran" target="_blank" rel="noreferrer"><i className="fa-brands fa-medium icon-sm"></i></a>
            </nav>
          </div>
          <div className="hero-visual">
            <img src="assets/profile.jpg" alt="Aaghran Ghosh" className="hero-img" />
          </div>
        </div>
      </header>
      
      <hr className="divider reveal" />
      
      <section className="section about reveal">
        <h2>The Core Identity</h2>
        <p>I am an AI product builder. Not a PM who just advises. Not an engineer who only executes specs. I do both — I define exactly what the AI feature should do, and I ship the production code that makes it real. My consulting workflow flows directly from this: build for yourself, write about the process, and let the proof of work serve as the signal.</p>
        <p>While my credibility anchor is my role as a Principal PM at ThoughtSpot, my primary signal is the architecture I deploy. I also run <a href="https://wanderingbong.com" target="_blank" rel="noreferrer" style={{color: 'var(--accent)', textDecoration: 'none'}}>WanderingBong</a>, a slow-travel blog which serves as the live production testbed for my custom AI models and MCP agents.</p>
      </section>

      <hr className="divider reveal" />

      {/* Featured Projects Highlight */}
      <section className="section reveal">
        <h2><i className="fa-solid fa-hammer text-accent icon-md"></i> Featured Projects</h2>
        <div className="projects-grid" style={{marginTop: '1.5rem'}}>
          {projects.slice(0, 2).map((p, i) => {
            const inner = (
              <>
                <div className="card-header">
                  <h3>{p.title} {p.isComingSoon ? <span className="badge">Coming Soon</span> : p.url ? <i className="fa-solid fa-arrow-up-right-from-square icon-xs"></i> : null}</h3>
                  <span className={`tag ${p.isComingSoon ? 'in-progress' : ''}`}>{p.tag}</span>
                </div>
                <p className="card-desc">{p.description}</p>
                {p.isComingSoon && <span className="cta-link">Join waitlist <i className="fa-solid fa-arrow-right icon-sm"></i></span>}
              </>
            );
            return p.url
              ? <a href={p.url} className={`project-card ${p.isComingSoon ? 'coming-soon' : ''}`} key={i} target="_blank" rel="noreferrer">{inner}</a>
              : <div className="project-card" key={i}>{inner}</div>;
          })}
        </div>
        <div style={{marginTop: '1.5rem'}}>
           <button onClick={() => setActiveTab('projects')} className="tab-btn" style={{color: 'var(--accent)', padding: 0}}>View all projects <i className="fa-solid fa-arrow-right icon-sm"></i></button>
        </div>
      </section>

      <hr className="divider reveal" />

      {/* Career Highlight */}
      <section className="section reveal">
         <h2><i className="fa-solid fa-briefcase text-accent icon-md"></i> Current Work</h2>
         <div className="work-timeline" style={{marginTop: '1.5rem'}}>
            <div className="work-card project-card">
              <div className="card-header" style={{alignItems: 'flex-start', flexWrap: 'wrap'}}>
                <div style={{flex: 1}}>
                  <h3 style={{fontSize: '1.25rem', marginBottom: '0.25rem'}}>{currentJob.role}</h3>
                  <span className="company-name" style={{color: 'var(--text-main)', fontWeight: 500}}>{currentJob.company}</span>
                </div>
                <div style={{textAlign: 'right'}}>
                  <span className="tag" style={{display: 'inline-block'}}>{currentJob.duration}</span>
                  <div style={{color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem'}}>
                    <i className="fa-solid fa-location-dot icon-xs"></i> {currentJob.location}
                  </div>
                </div>
              </div>
              <p className="card-desc" style={{marginTop: '1rem'}}>{currentJob.bullets[0]}</p>
            </div>
         </div>
         <div style={{marginTop: '1.5rem'}}>
           <button onClick={() => setActiveTab('work')} className="tab-btn" style={{color: 'var(--accent)', padding: 0}}>View full professional history <i className="fa-solid fa-arrow-right icon-sm"></i></button>
        </div>
      </section>

      <hr className="divider reveal" />

      {/* Recent Writing Highlight */}
      <section className="section reveal">
        <h2><i className="fa-solid fa-feather text-accent icon-md"></i> Recent Writing</h2>
        <div className="article-grid">
          {writings.slice(0, 3).map((w, i) => (
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
        <div style={{marginTop: '1.5rem'}}>
           <button onClick={() => setActiveTab('writing')} className="tab-btn" style={{color: 'var(--accent)', padding: 0}}>Read all articles <i className="fa-solid fa-arrow-right icon-sm"></i></button>
        </div>
      </section>

    </div>
  )
}
