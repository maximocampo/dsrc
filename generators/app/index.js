"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the top-notch ${chalk.red(
          "React.js components"
        )} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "name",
        message: "Please enter your new component name",
        default: "Component"
      },
      {
        type: "list",
        name: "type",
        message: "Select your component type",
        choices: ["Functional component", "Class component"],
        default: 0
      },
      {
        type: "confirm",
        name: "jss",
        message: "Are you using jss?"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("component.ejs"),
      this.destinationPath(`${this.props.name}/${this.props.name}.js`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath("componentTest.ejs"),
      this.destinationPath(`${this.props.name}/${this.props.name}.test.js`),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath("index.ejs"),
      this.destinationPath(`${this.props.name}/index.js`),
      this.props
    );

    if (this.props.jss) {
      this.fs.copy(
        this.templatePath("styles.js"),
        this.destinationPath(`${this.props.name}/styles.js`)
      );
    }
  }
};
