import { useEffect, useState } from 'react'
import AboutMe from './pages/AboutMe'
import Projects from './pages/Projects'
import Work from './pages/Work'
import Writing from './pages/Writing'
import ProjectDetails from './pages/ProjectDetails'
import { projects } from './data'

export default function App() {
  const [activeTab, setActiveTab] = useState('about')
  const [activeProject, setActiveProject] = useState(null)

  // IntersectionObserver and Hash Router globally
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    // Slight delay to allow DOM to render dynamically generated components
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    }, 100);

    // Setup hashchange routing listener for robust internal navigations
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#project/')) {
        const id = hash.replace('#project/', '');
        const proj = projects.find(p => p.id === id);
        if (proj) {
          window.scrollTo(0, 0); // Reset scroll to top
          setActiveProject(proj);
          setActiveTab('project-detail');
          return;
        }
      }
      // If we are on internal detail but the hash cleared, bounce back to projects
      if (activeTab === 'project-detail' && (!hash || hash === '' || hash === '#')) {
        setActiveTab('projects');
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHash);
    }
  }, [activeTab]);

  return (
    <>
      {activeTab !== 'project-detail' && (
      <nav className="global-nav reveal active">
        <div className="nav-container">
          <div className="nav-brand">AG</div>
          <div className="tabs-navigation">
            <button 
              className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => { setActiveTab('about'); window.location.hash = ''; }}
            >
              <i className="fa-solid fa-house icon-sm"></i> Home
            </button>
            <button 
              className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => { setActiveTab('projects'); window.location.hash = ''; }}
            >
              <i className="fa-solid fa-hammer icon-sm"></i> Projects
            </button>
            <button 
              className={`tab-btn ${activeTab === 'work' ? 'active' : ''}`}
              onClick={() => { setActiveTab('work'); window.location.hash = ''; }}
            >
              <i className="fa-solid fa-briefcase icon-sm"></i> Work
            </button>
            <button 
              className={`tab-btn ${activeTab === 'writing' ? 'active' : ''}`}
              onClick={() => { setActiveTab('writing'); window.location.hash = ''; }}
            >
              <i className="fa-solid fa-feather icon-sm"></i> Writing
            </button>
          </div>
        </div>
      </nav>
      )}

      <main className="container page-content">
        {activeTab === 'about' && <AboutMe setActiveTab={setActiveTab} />}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'work' && <Work />}
        {activeTab === 'writing' && <Writing />}
        {activeTab === 'project-detail' && activeProject && <ProjectDetails project={activeProject} />}

        {activeTab !== 'project-detail' && <hr className="divider reveal active" style={{marginTop: '4rem'}} />}

        {activeTab !== 'project-detail' && (
        <footer className="footer reveal active">
           <p><i className="fa-solid fa-location-dot icon-sm"></i> Bangalore, India &nbsp;&middot;&nbsp; <i className="fa-solid fa-envelope icon-sm"></i> aaghran@gmail.com</p>
           <div className="footer-links">
             <a href="https://linkedin.com/in/aaghran" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin icon-sm"></i></a>
             <a href="https://github.com/aaghran" target="_blank" rel="noreferrer"><i className="fa-brands fa-github icon-sm"></i></a>
             <a href="https://wanderingbong.com" target="_blank" rel="noreferrer"><i className="fa-solid fa-compass icon-sm"></i></a>
             <a href="https://aaghran.substack.com" target="_blank" rel="noreferrer"><i className="fa-solid fa-pen-nib icon-sm"></i></a>
           </div>
        </footer>
        )}
      </main>
    </>
  )
}
