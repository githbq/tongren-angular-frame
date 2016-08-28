module.exports = {
    "proxies": [
        // {
        //     "path": "/(login|resources|logout|g/api|getcaptcha)",
        //     "proxy": "172.31.103.107:8080"
        // }
        {
            "path": "/(td/api)",
            "proxy": "http://hj.fssde.com/cs"
        }
    ]
};