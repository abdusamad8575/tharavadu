import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import './About.css'  // Importing the CSS file

function About() {
  return (
    <div>
      <NavBar />
      
      <section className="about-intro">
        <h1>About Our Family</h1>
        <p>
          Welcome to our family website! We are a proud family from Kerala, deeply rooted in tradition and culture. Our story is one of unity, love, and shared memories that span generations.
        </p>
      </section>

      <section className="family-history">
        <div className="container">
          <h2>Our Family History</h2>
          <p>
            Our family traces its roots back to the heart of Kerala, where our ancestors lived and thrived amidst the lush greenery and vibrant culture of the region. Over the years, our family has grown and spread across the globe, yet we remain connected through our shared heritage and values.
          </p>
          <p>
            We take pride in our lineage and the values passed down from generation to generation. Our family has always been known for its strong sense of community, respect for tradition, and commitment to education and service.
          </p>
        </div>
      </section>

      <section className="family-values">
        <div className="container">
          <h2>Our Values</h2>
          <ul>
            <li>Unity: We believe in the strength of togetherness and supporting each other in all aspects of life.</li>
            <li>Respect: We honor our elders and cherish the wisdom they impart.</li>
            <li>Tradition: We celebrate our cultural heritage and keep our customs alive through each generation.</li>
            <li>Education: We prioritize learning and encourage each member to pursue knowledge and personal growth.</li>
            <li>Service: We are committed to giving back to our community and helping those in need.</li>
          </ul>
        </div>
      </section>

      {/* <section className="family-photo">
        <div className="container">
          <h2>Family Moments</h2>
          <p>
            Here are some cherished moments we've captured over the years.
          </p>
          <div className="photo-container">
            <img
              src="image.jpeg"
              alt="Family photo"
            />
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  )
}

export default About
