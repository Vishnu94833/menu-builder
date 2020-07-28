import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  const footerLinks = [
    { href: "/home", label: "Home" },
    { href: "/aboutus", label: "About Us" },
    { href: "/menu", label: "Menu" },
    { href: "/contactus", label: "Contact Us" },
  ];
  return (
    <div className="footer">
      <footer class="page-footer font-small blue pt-4">
        <div class="container text-center text-md-left">
          <div class="row">
          <div class="col-md-3 mb-md-0 mb-3">
              <img src="assets/images/logo-1.png" alt="Lorem ipsum" width="150" height="100"/>
            </div>
            <div class="col-md-3 mb-md-0 mb-3">
              <h5 class="text-uppercase">Links</h5>
              <ul class="list-unstyled">
                <Links footerLinks={footerLinks} />
              </ul>
            </div>

            <div class="col-md-6 mt-md-0 mt-3">
              <h5 class="text-uppercase">Lorem ipsum</h5>
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
        <div class="footer-copyright text-center py-3">
          © 2020 Copyright Lorem ipsum
        </div>
      </footer>
    </div>
  );
}
function Links({ footerLinks }) {
  return footerLinks.map((e) => {
    return (
      <li key={e.label}>
        <Link to={e.href}>{e.label}</Link>
      </li>
    );
  });
}
export default Footer;
