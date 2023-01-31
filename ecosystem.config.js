module.exports = {
    apps : [{
      name: "app",
      script: "./index.js",
      watch:true
    }, {
       name: 'worker',
       script: './index.js'
    }]
  }