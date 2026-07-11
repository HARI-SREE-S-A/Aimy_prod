import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCollectionData } from '@/lib/data';
export const metadata = {
  title: 'Careers | Aimy India',
  description: 'Join the Aimy India team and help us build the future of LED lighting solutions.',
};

export default async function CareersPage() {
  const careers = await getCollectionData('careers', []);
  const siteSettings = await getCollectionData('siteSettings');
  
  // Fallback data if DB is empty or not connected
  const jobs = careers.length > 0 ? careers : [
    {
      id: 'fallback-1',
      title: 'SR. EXECUTIVE/ASSISTANT MANAGER – RETAIL LIGHTING',
      location: 'India',
      type: 'Full-time',
      description: 'Candidate should have experience in channel sales and dealer distribution. Responsible for channel sales, distribution, retail, monthly sales forecasting and expansion of channel network.',
      requirements: '- Strong local market experience is mandatory\n- Experience in channel sales and dealer distribution\n- Monthly sales forecasting and inventory planning\n- Payment collections and MIS reporting'
    },
    {
      id: 'fallback-2',
      title: 'Lighting Installation Technician',
      location: 'India (KSA/Gulf Exp Preferred)',
      type: 'Full-time',
      description: 'Technician of Hygienic Cutting Fixtures & Lighting. Salary: SAR 2300 + 200 + Accommodation + Transport + Medical Provided by Company.',
      requirements: '- Experience with modern communication & tracking devices\n- Experience in hygienic cutting fixtures and lighting installation\n- Previous Gulf experience is preferred'
    },
    {
      id: 'fallback-3',
      title: 'Merchandiser (Furniture, Home Décor, Lighting)',
      location: 'Delhi, India',
      type: 'Full-time',
      description: 'Candidate must have experience in hardgoods (furniture, home decor, lighting, houseware, garden decor), preferably in buying agency or export house.',
      requirements: '- Strong experience in hardgoods merchandising\n- Good communication skills, presentable and smart\n- Experience in buying agency or export'
    }
  ];

  return (
    <>
      <Header siteSettings={siteSettings} />
      
      <main>
        <section className="page-header">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span className="separator">/</span>
              <span className="current">Careers</span>
            </div>
            <h1>Join Our Team</h1>
            <p>Build your career with one of India's leading LED lighting manufacturers.</p>
          </div>
        </section>

        <section className="section">
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="text-center" style={{ marginBottom: '3rem' }}>
              <h2 className="section-title">Current <span>Openings</span></h2>
              <div className="accent-line"></div>
              <p>We are always on the lookout for talented individuals. Check out our current open positions below.</p>
            </div>

            <div className="careers-list">
              {jobs.map((job) => (
                <div key={job.id} className="card" style={{ marginBottom: '1.5rem', padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#1a1a1a' }}>{job.title}</h3>
                      <div className="career-meta" style={{ marginBottom: '1rem' }}>
                        <span>📍 {job.location}</span>
                        <span>💼 {job.type}</span>
                      </div>
                    </div>
                    <a href={`mailto:hr@aimyindia.in?subject=Application for ${job.title}`} className="btn btn-primary btn-sm">
                      Apply Now
                    </a>
                  </div>
                  
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                    <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Description</h4>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>{job.description}</p>
                    
                    {job.requirements && (
                      <>
                        <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Requirements</h4>
                        <div style={{ fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                          {job.requirements}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center" style={{ marginTop: '4rem', padding: '2rem', background: '#f9f9f9', borderRadius: '10px' }}>
              <h3 style={{ marginBottom: '1rem' }}>Don't see a perfect fit?</h3>
              <p style={{ marginBottom: '1.5rem', color: '#666' }}>We'd still love to hear from you. Send us your resume and we'll keep it on file for future opportunities.</p>
              <a href="mailto:hr@aimyindia.in" className="btn btn-outline">Send Resume</a>
            </div>
          </div>
        </section>
      </main>

      <Footer siteSettings={siteSettings} />
    </>
  );
}
