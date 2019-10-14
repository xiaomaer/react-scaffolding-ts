const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const ora = require("ora");
// 项目初始化模版路径
const template = path.resolve(__dirname, "../template");

// 初始化项目
function init() {
  const options = [
    {
      name: "name",
      type: "input",
      message: "请输入项目名称",
      validate: function(name) {
        return !!name;
      }
    },
    {
      name: "description",
      type: "input",
      message: "请输入项目描述"
    },
    {
      name: "version",
      type: "input",
      message: "请输入版本号",
      default: "0.0.1"
    },
    {
      name: "author",
      type: "input",
      message: "请输入作者名称"
    }
  ];
  inquirer.prompt(options).then(answers => {
    const { name, description, version, author } = answers;
    // 项目路径
    const des = path.resolve(`${process.cwd()}/${name}`);
    const loading = ora("downloading template ...");
    loading.start();
    // 把初始化项目的模版复制到des文件夹下
    copyDir(template, des);
    //修改项目文件夹中 package.json 文件
    const fileName = `${des}/package.json`;
    if (fs.existsSync(fileName)) {
      const contents = JSON.parse(fs.readFileSync(fileName, "utf8"));
      contents.name = name;
      contents.author = author;
      contents.description = description;
      contents.version = version;
      fs.writeFileSync(fileName, JSON.stringify(contents, null, "\t"), "utf-8");
      loading.succeed();
      console.log(chalk.green("项目初始化完成"));
    }
  });
}

// 递归复制template目录下的文件
function copyDir(src, des) {
  if (fs.existsSync(des)) {
    _copy(src, des);
  } else {
    fs.mkdirSync(des);
  }

  function _copy(src, des) {
    try {
      const paths = fs.readdirSync(src);
      paths.forEach(function(path) {
        const _src = src + "/" + path;
        const _des = des + "/" + path;
        const stat = fs.statSync(_src);
        // 判断是文件还是目录
        if (stat.isFile()) {
          fs.writeFileSync(_des, fs.readFileSync(_src));
        } else if (stat.isDirectory()) {
          // 当是目录时，递归复制
          copyDir(_src, _des);
        }
      });
    } catch (error) {
      console.log("项目初始化错误", chalk.red(err));
      loading.fail();
    }
  }
}

module.exports = init;
