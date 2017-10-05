module.exports = (function (settings) {

    const seleniumLocal = {
        "host": "localhost",
        "port": "4444"
    };

    settings.selenium.start_process = true;
    settings.selenium.server_path = require("selenium-server-standalone-jar").path;
    settings.selenium.cli_args = {
        "webdriver.chrome.driver": require("chromedriver").path,
        "webdriver.gecko.driver": require("geckodriver").path,
        "webdriver.ie.driver": ""
    };

    if (process.env.CONFIGURATION === "browserstack") {
        // Enabling browserstack-automate node integration
        require('browserstack-automate').Nightwatch();

        settings.test_settings.default.desiredCapabilities = Object.assign(
            settings.test_settings.default.desiredCapabilities, {
                project: "e2e-study-group",
                os_version: "7",
                os: "windows",
                resolution: "1280x800",
        });

    } else {
        settings.test_settings.default.selenium_host = seleniumLocal.host;
        settings.test_settings.default.selenium_port = seleniumLocal.port;
    }

    settings.test_settings.default.launch_url = process.env.BASE_URL;

    return settings;

})(require('./nightwatch.json'));
