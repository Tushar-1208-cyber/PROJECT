// Base Component Class
class Component {
  constructor(parent) {
    this.parent = parent;
  }

  renderElement(tag, attributes = {}, content = "") {
    const element = document.createElement(tag);
    for (let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
    if (content) {
      element.textContent = content;
    }
    return element;
  }
}

// Header Component
class Header extends Component {
  constructor(parent, config) {
    super(parent);
    this.config = config;
  }

  render() {
    const homeIcon = this.renderElement("div", { class: "home-icon" });
    const homeLink = this.renderElement("a", { href: this.config.logo.link });
    const homeImg = this.renderElement("img", {
      src: this.config.logo.icon,
      alt: "Home",
    });
    homeLink.appendChild(homeImg);
    homeIcon.appendChild(homeLink);
    this.parent.appendChild(homeIcon);
  }
}

// Signup Form Component
class SignupForm extends Component {
  constructor(parent, config) {
    super(parent);
    this.config = config;
  }

  render() {
    const formContainer = this.renderElement("div", { class: "signup-container" });

    const title = this.renderElement("h2", {}, this.config.title);
    formContainer.appendChild(title);

    const form = this.renderElement("form", { action: "#" });

    // Render Input Fields
    this.config.fields.forEach((field) => {
      const input = this.renderElement("input", {
        type: field.type,
        name: field.name,
        placeholder: field.placeholder,
        required: field.required ? "required" : "",
      });
      form.appendChild(input);
    });

    // Render Checkbox
    const checkboxContainer = this.renderElement("div", { class: "checkbox" });
    const checkbox = this.renderElement("input", {
      type: "checkbox",
      name: this.config.checkbox.name,
      required: this.config.checkbox.required ? "required" : "",
    });
    const label = this.renderElement("label", {}, this.config.checkbox.label);
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(label);
    form.appendChild(checkboxContainer);

    // Render Submit Button
    const submitBtn = this.renderElement(
      "button",
      { type: "submit", class: this.config.buttons.submit.class },
      this.config.buttons.submit.text
    );
    form.appendChild(submitBtn);

    // Render OR Divider
    const orDivider = this.renderElement("div", { class: "or-divider" }, "OR");
    form.appendChild(orDivider);

    // Render Social Buttons
    const socialContainer = this.renderElement("div", { class: "social-signup" });
    this.config.buttons.social.forEach((button) => {
      const socialBtn = this.renderElement(
        "button",
        { class: button.class },
        button.text
      );
      socialContainer.appendChild(socialBtn);
    });
    form.appendChild(socialContainer);

    // Render Footer
    const footer = this.renderElement("div", { class: "footer" });
    const footerText = this.renderElement("p", {}, this.config.footer.text + " ");
    const footerLink = this.renderElement("a", { href: this.config.footer.link.href }, this.config.footer.link.text);
    footerText.appendChild(footerLink);
    footer.appendChild(footerText);
    form.appendChild(footer);

    formContainer.appendChild(form);
    this.parent.appendChild(formContainer);
  }
}

// Page Class to Compose Components
class SignupPage {
  constructor(config) {
    this.config = config;
    this.body = document.body;
  }

  render() {
    const header = new Header(this.body, this.config.header);
    header.render();

    const signupForm = new SignupForm(this.body, this.config.form);
    signupForm.render();
  }
}

// Fetch JSON and Render Page
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("signup.json"); // Load JSON
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const config = await response.json();
    const signupPage = new SignupPage(config);
    signupPage.render();
  } catch (error) {
    console.error("Error loading configuration:", error);
  }
});
