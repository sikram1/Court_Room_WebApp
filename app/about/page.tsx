export default function AboutPage() {
    return (
      <main style={{ padding: 20 }}>
        <h1>About This Project</h1>
        <p>
          Developed by <strong>Sikram (20900837)</strong> as part of a Web
          Development assignment demonstrating accessibility, interactivity, and
          theme management in Next.js.
        </p>
  
        <h2>How to Use</h2>
        <video controls width="600">
          <source src="/videos/how-to-use.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </main>
    );
  }
  