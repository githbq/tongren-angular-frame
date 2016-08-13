var treeData = {};
treeData.tree = [
    {
        "$$isExpend":true,
        "id": "1",
        "pid": "0",
        "name": "页面",
        "children": [
            {
                "uiSref": "home.msgtalk",
                "id": "11",
                "pid": "3",
                "name": "用户会话1",
                "url":"#/home/msgtalk"
            },
            {
                "uiSref": "home.msgtalk2",
                "id": "12",
                "pid": "3",
                "name": "用户会话2",
                "url":"#/home/msgtalk2"
            }
            ,
            {
                "uiSref": "home.msgtalk3",
                "id": "12",
                "pid": "3",
                "name": "用户会话3",
                "url":"#/home/msgtalk3"
            }
        ]
    },
    {
        "$$isExpend": true,
        "id": "2",
        "pid": "0",
        "name": "账号管理",
        "children": [
            {
                "uiSref": "home.account",
                "id": "21",
                "pid": "0",
                "name": "账号管理",
                "url":"#/home/account"
            }
        ]
    },
    {
        "$$isExpend": true,
        "id": "3",
        "pid": "0",
        "name": "资讯管理",
        "children": [
            {
                "uiSref": "home.info",
                "id": "31",
                "pid": "0",
                "name": "资讯管理",
                "url":"#/home/info"
            }
        ]
    }
    ,
    {
        "$$isExpend": true,
        "id": "4",
        "pid": "0",
        "name": "患者管理",
        "children": [
            {
                "uiSref": "home.patient",
                "id": "41",
                "pid": "0",
                "name": "患者管理",
                "url":"#/home/patient"
            }
        ]
    } ,
    {
        "$$isExpend": true,
        "id": "5",
        "pid": "0",
        "name": "医生管理",
        "children": [
            {
                "uiSref": "home.doctor",
                "id": "51",
                "pid": "0",
                "name": "医生管理",
                "url":"#/home/doctor"
            }
        ]
    } ,
    {
        "$$isExpend": true,
        "id": "6",
        "pid": "0",
        "name": "会议管理",
        "children": [
            {
                "uiSref": "home.meeting",
                "id": "61",
                "pid": "0",
                "name": "会议管理",
                "url":"#/home/meeting"
            }
        ]
    },
    {
        "$$isExpend": true,
        "id": "7",
        "pid": "0",
        "name": "短信管理",
        "children": [
            {
                "uiSref": "home.shortmessage",
                "id": "71",
                "pid": "0",
                "name": "会议管理",
                "url":"#/home/shortmessage"
            }
        ]
    },
    {
        "$$isExpend": true,
        "id": "8",
        "pid": "0",
        "name": "字典管理",
        "children": [
            {
                "uiSref": "home.dictionary",
                "id": "81",
                "pid": "0",
                "name": "字典管理",
                "url":"#/home/dictionary"
            }
        ]
    }
];

treeData.itemClicked = function ($item) {
    treeData.selectedItem = $item;
    console.log($item, 'item clicked');
};

treeData.itemCheckedChanged = function ($item) {

    console.log($item, 'item checked');
};
module.exports = treeData;