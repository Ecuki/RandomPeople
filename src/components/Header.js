import React from "react";
import logo from "../assets/logo2.png";
// import "../sass/_Header.scss";
function Header() {
  const searchForActivClass = object => {
    const classList = object.classList;
    let activeClass = "";
    for (let i = 0; i < classList.length; i++) {
      const tempClass = classList[i];
      if (tempClass.includes("--active")) {
        activeClass += tempClass;
      }
    }
    return activeClass;
  };
  const handleClickButton = e => {
    e.preventDefault();
    document
      .querySelector(`#${e.target.name}`)
      .scrollIntoView({ behavior: "smooth" });

    const classList = [...e.target.classList];
    let activeClass = searchForActivClass(e.target);

    if (e.target.classList.contains(`${activeClass}`)) {
      return;
    } else {
      const buttons = document.getElementsByClassName(`${classList[0]}`);
      [...buttons].map(button => {
        if (searchForActivClass(button)) {
          activeClass += searchForActivClass(button);
          button.classList.remove(activeClass);
        }
        return activeClass;
      });
      e.target.classList.add(activeClass);
      return (activeClass = "");
    }
  };
  const header = (
    <header className="header" id="header">
      <div className="logo header__logo">
        <img
          className="logo__img"
          src={logo}
          alt="JSecrets logo https://logomakr.com/"
        />
        <p className="logo__text">Hello</p>
      </div>
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item ">
            <a
              name="header"
              href="/"
              className="nav__item-link nav__item-link--active btn"
              onClick={e => handleClickButton(e)}
            >
              Start
            </a>
          </li>
          <li className="nav__item">
            <a
              name="chart"
              href="/"
              className="nav__item-link btn"
              onClick={e => handleClickButton(e)}
            >
              Chart
            </a>
          </li>
          <li className="nav__item">
            <a
              name="map"
              href="/"
              className="nav__item-link btn"
              onClick={e => handleClickButton(e)}
            >
              Map
            </a>
          </li>
          <li className="nav__item">
            <a
              name="footer"
              href="/"
              className="nav__item-link btn"
              onClick={e => handleClickButton(e)}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
  return header;
}

export default Header;
