import logo from "./hero-img.png";
const Banner = () => {
  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            <h1>Better Solutions For Your Business</h1>
            <h2>
              We are team of talanted designers making websites with Bootstrap
            </h2>
            <div className="d-lg-flex">
              <a href="/register" className="btn-get-started scrollto">
                Register
              </a>
              <a
                href="https://www.youtube.com/watch?v=jDDaplaOz7Q"
                className="venobox btn-watch-video"
                data-vbtype="video"
                data-autoplay="true"
              >
                {" "}
                Watch Video <i className="icofont-play-alt-2" />
              </a>
            </div>
          </div>
          <div
            className="col-lg-6 order-1 order-lg-2 hero-img"
            data-aos="zoom-in"
            data-aos-delay={200}
          >
            <img src={logo} className="img-fluid animated" alt="hero" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
