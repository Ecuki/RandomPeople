import React from "react";
import logo from "../assets/logo2.png";

function Button({ active, name, onClick }) {
  const getClassName = () => {
    const className = "nav__item-link btn";
    const classActive = className + " nav__item-link--active";
    return name === active ? classActive : className;
  };
  return (
    <li className="nav__item ">
      <a
        name={name}
        href="/"
        className={getClassName()}
        onClick={e => onClick(e)}
      >
        {name}
      </a>
    </li>
  );
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "person"
    };
    this.sections = ["person", "weather", "chart", "map", "contact"];
  }
  scrollTo = e => {
    e.preventDefault();
    document
      .querySelector(`#${e.target.name}`)
      .scrollIntoView({ behavior: "smooth" });
  };
  handleChangeButton(e) {
    e.preventDefault();
    const active = e.target.name;
    this.setState({ active });
    this.scrollTo(e);
  }

  createNav() {
    let nav = [];
    for (let section of this.sections) {
      nav.push(
        <Button
          key={section}
          name={section}
          onClick={e => this.handleChangeButton(e)}
          active={this.state.active}
        />
      );
    }
    return nav;
  }
  handleScroll = () => {
    const windowY = window.pageYOffset;
    for (let section of this.sections) {
      if (section !== this.state.active) {
        const element = document.getElementById(section);
        if (
          element &&
          element.offsetTop < windowY + element.offsetHeight / 2 &&
          !(
            element.offsetTop + element.offsetHeight <
            windowY + element.offsetHeight
          )
        ) {
          this.setState({
            active: section
          });
        }
      }
    }
    return true;
  };
  render() {
    document.addEventListener("wheel", () => this.handleScroll(), false);
    return (
      <>
        <div className="logo">
          <img
            className="logo__img"
            src={logo}
            alt="JSecrets logo https://logomakr.com/"
          />
          <p className="logo__text">It's nice to see you here</p>
        </div>
        <nav className="nav">
          <ul className="nav__list">{this.createNav()}</ul>
        </nav>
      </>
    );
  }
}

export default Header;
