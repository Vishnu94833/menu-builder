import { Link } from "react-router-dom";

function Footer(props: any) {
  const footerLinks = [
    { href: "/home", label: "Home" },
    { href: "/aboutus", label: "About Us" },
    { href: "/menu", label: "Menu" },
    { href: "/contactus", label: "Contact Us" },
  ];
  return (
    <div className="footer">
      <footer className="page-footer font-small blue pt-4">
        <div className="container text-center text-md-left">
          <div className="row">
            <div className="col-md-3 mb-md-0 mb-3">
              <a href="#/home">
                <img
                  src="assets/images/logo-1.png"
                  alt="Lorem ipsum"
                  width="150"
                  height="100"
                />
              </a>
            </div>
            <div className="col-md-3 mb-md-0 mb-3">
              <h5 className="text-uppercase">Links</h5>
              <ul className="list-unstyled">
                <Links footerLinks={footerLinks} />
              </ul>
            </div>

            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase">Lorem ipsum</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit, urna
                consequat felis vehicula class ultricies mollis dictumst, aenean
                non a in donec nulla. Phasellus ante pellentesque erat cum risus
                consequat imperdiet aliquam, integer placerat et turpis mi eros
                nec lobortis taciti, vehicula nisl litora tellus ligula
                porttitor metus.
              </p>
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center py-3">
          © 2020 Copyright Lorem ipsum
        </div>
      </footer>
    </div>
  );
}
function Links({ footerLinks }: any) {
  return footerLinks.map((e: any) => {
    return (
      <li key={e.label} className="footer-links">
        <Link to={e.href}>{e.label}</Link>
      </li>
    );
  });
}
export default Footer;
