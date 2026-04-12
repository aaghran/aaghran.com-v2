import { useEffect } from 'react'
import VanillaTilt from 'vanilla-tilt'
import { projects } from '../data'

export default function Projects() {
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 4,
        speed: 400,
        glare: true,
        "max-glare": 0.05,
    });
  }, [])

  return (
    <div className="fade-in section">
      <h2><i className="fa-solid fa-hammer text-accent icon-md"></i> Building</h2>
      <p className="page-desc">The products, experiments, and sandboxes I'm currently working on.</p>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <a
            href={`#project/${p.id}`}
            className={`project-card ${p.isComingSoon ? 'coming-soon' : ''}`}
            key={i}
          >
            <div className="card-header">
              <h3>
                {p.title}{' '}
                {p.isComingSoon
                  ? <span className="badge">Coming Soon</span>
                  : p.url
                    ? <i className="fa-solid fa-arrow-up-right-from-square icon-xs"></i>
                    : null}
              </h3>
              <span className={`tag ${p.isComingSoon ? 'in-progress' : ''}`}>{p.tag}</span>
            </div>
            <p className="card-desc">{p.description}</p>
            {p.isComingSoon && <span className="cta-link">Join waitlist <i className="fa-solid fa-arrow-right icon-sm"></i></span>}
          </a>
        ))}
      </div>
    </div>
  )
}
