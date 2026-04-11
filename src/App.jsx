import { useEffect, useState } from 'react'
import AboutMe from './pages/AboutMe'
import Projects from './pages/Projects'
import Work from './pages/Work'
import Writing from './pages/Writing'

export default function App() {
  const [activeTab, setActiveTab] = useState('about')

  // IntersectionObserver for reveal elements globally
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

    return () => {
      observer.disconnect();
    }
  }, [activeTab]);

  return (
    <>
      <nav className="global-nav reveal active">
        <div className="nav-container">
          <div className="nav-brand">AG</div>
          <div className="tabs-navigation">
            <button 
              className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              <i className="fa-solid fa-house icon-sm"></i> Home
            </button>
            <button 
              className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <i className="fa-solid fa-hammer icon-sm"></i> Projects
            </button>
            <button 
              className={`tab-btn ${activeTab === 'work' ? 'active' : ''}`}
              onClick={() => setActiveTab('work')}
            >
              <i className="fa-solid fa-briefcase icon-sm"></i> Work
            </button>
            <button 
              className={`tab-btn ${activeTab === 'writing' ? 'active' : ''}`}
              onClick={() => setActiveTab('writing')}
            >
              <i className="fa-solid fa-feather icon-sm"></i> Writing
            </button>
          </div>
        </div>
      </nav>

      <main className="container page-content">
        {activeTab === 'about' && <AboutMe setActiveTab={setActiveTab} />}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'work' && <Work />}
        {activeTab === 'writing' && <Writing />}

        <hr className="divider reveal active" style={{marginTop: '4rem'}} />

        <footer className="footer reveal active">
           <p><i className="fa-solid fa-location-dot icon-sm"></i> Bangalore, India &nbsp;&middot;&nbsp; <i className="fa-solid fa-envelope icon-sm"></i> aaghran@gmail.com</p>
           <div className="footer-links">
             <a href="https://linkedin.com/in/aaghran" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin icon-sm"></i></a>
             <a href="https://github.com/aaghran" target="_blank" rel="noreferrer"><i className="fa-brands fa-github icon-sm"></i></a>
             <a href="https://wanderingbong.com" target="_blank" rel="noreferrer"><i className="fa-solid fa-compass icon-sm"></i></a>
             <a href="https://aaghran.substack.com" target="_blank" rel="noreferrer"><i className="fa-solid fa-pen-nib icon-sm"></i></a>
           </div>
        </footer>
      </main>
    </>
  )
}
