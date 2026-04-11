import { workExperience } from '../data'

export default function Work() {
  return (
    <div className="fade-in section work-page">
      <h2><i className="fa-solid fa-briefcase text-accent icon-md"></i> Professional History</h2>
      <p className="page-desc">Building scaling platforms, launching new architectures, and leading AI-native product teams.</p>
      
      <div className="work-timeline">
        {workExperience.map((job, idx) => (
          <div className="work-card project-card" key={idx} style={{marginBottom: '1.5rem'}}>
            <div className="card-header" style={{alignItems: 'flex-start', flexWrap: 'wrap'}}>
              <div style={{flex: 1}}>
                <h3 style={{fontSize: '1.25rem', marginBottom: '0.25rem'}}>{job.role}</h3>
                <span className="company-name" style={{color: 'var(--text-main)', fontWeight: 500}}>{job.company}</span>
              </div>
              <div style={{textAlign: 'right'}}>
                <span className="tag" style={{display: 'inline-block'}}>{job.duration}</span>
                <div style={{color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem'}}>
                  <i className="fa-solid fa-location-dot icon-xs"></i> {job.location}
                </div>
              </div>
            </div>
            <ul className="work-bullets" style={{marginTop: '1rem', paddingLeft: '1.2rem'}}>
              {job.bullets.map((bullet, i) => (
                <li key={i} style={{marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5}}>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
