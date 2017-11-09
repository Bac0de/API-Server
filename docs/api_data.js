define({ "api": [
  {
    "type": "get",
    "url": "/common/vm/add",
    "title": "POST Add VM",
    "description": "<p>Add and create VM at remote.</p>",
    "name": "AddVM",
    "group": "Common",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "data",
            "description": "<p>vm information.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "data",
          "content": "{\n\t\t\"nickname\":\"ctest\",\n\t\t\"cpu_core\":8,\n\t\t\"main_memory\":32,\n\t\t\"disk_memory\":512,\n\t\t\"start_command\":\"echo\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>just set &quot;ok&quot;.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "http/1.1 200 ok\n{\n\t\"message\":\"ok\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>reason of error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-response:",
          "content": "http/1.1 400 Bad Request.\n{\n\t\"message\":\"Parameter \\\"data\\\" require\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/common.js",
    "groupTitle": "Common"
  },
  {
    "type": "get",
    "url": "/common/vm/control",
    "title": "POST Control VM",
    "description": "<p>Control the VM.</p>",
    "name": "ControlVM",
    "group": "Common",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "data",
            "description": "<p>command field:control command</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "data",
          "content": "{\n\t\"command\":\"./reboot 1\"\n}",
          "type": "string"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>just set &quot;ok&quot;.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "http/1.1 200 ok\n{\n\t\"message\":\"ok\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>reason of error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-response:",
          "content": "http/1.1 400 Bad Bad Request.\n{\n\t\"message\":\"Parameter \\\"data\\\" require\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/common.js",
    "groupTitle": "Common"
  },
  {
    "type": "get",
    "url": "/common/vm/delete",
    "title": "POST Delete VM",
    "description": "<p>Delete  VM Information.</p>",
    "name": "DeleteVM",
    "group": "Common",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>VM Identifier</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "id",
          "content": "id:10",
          "type": "Number"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>just set &quot;ok&quot;.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "http/1.1 200 ok\n{\n\t\"message\":\"ok\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>reason of error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-response:",
          "content": "http/1.1 400 Bad Bad Request.\n{\n\t\"message\":\"Parameter \\\"id\\\" require\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/common.js",
    "groupTitle": "Common"
  },
  {
    "type": "get",
    "url": "/common/config",
    "title": "GET batu config.",
    "name": "GetBatuConfig",
    "group": "Common",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "nickname",
            "description": "<p>a batu system nickname.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "discript",
            "description": "<p>a batu system discription.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "batu",
            "description": "<p>a batu flag.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "http/1.1 200 ok\n\t{\n\t\"nickname\":\"batu\", \n\t\"discript\":\"yes jam.\",\n\t\"batu\":true \n\t}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>reason of error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-response:",
          "content": "http/1.1 404 Page Not Found.\n{\n\t\"message\":\"Cannot Read Config.json\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/common.js",
    "groupTitle": "Common"
  },
  {
    "type": "get",
    "url": "/common/vm/list",
    "title": "GET Get VM List.",
    "description": "<p>Get vm informations in current batu system</p>",
    "name": "Get_VM_List",
    "group": "Common",
    "success": {
      "examples": [
        {
          "title": "Success-response:",
          "content": "http/1.1 200 ok\n[\n\t{\n\t\t\"id\":2,\n\t\t\"nickname\":\"ctest\",\n\t\t\"cpu_core\":8,\n\t\t\"main_memory\":32,\n\t\t\"disk_memory\":512,\n\t\t\"start_command\":\"echo\"\n\t\t,\"createdAt\":\"2017-11-07T13:17:52.876Z\"\n\t\t,\"updatedAt\":\"2017-11-07T13:17:52.876Z\"\n\t},\n\t{ \n\t\t...\n\t}\n\n\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/common.js",
    "groupTitle": "Common"
  },
  {
    "type": "get",
    "url": "/common/vm/update",
    "title": "POST Update VM",
    "description": "<p>Update VM Settings.</p>",
    "name": "UpdateVM",
    "group": "Common",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "data",
            "description": "<p>vm information. update vm data.id field</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "data",
          "content": "{\t\t\n\t\t\"id\":1\n\t\t\"nickname\":\"ctest\",\n\t\t\"cpu_core\":8,\n\t\t\"main_memory\":32,\n\t\t\"disk_memory\":512,\n\t\t\"start_command\":\"echo\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>just set &quot;ok&quot;.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "http/1.1 200 ok\n{\n\t\"message\":\"ok\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>reason of error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-response:",
          "content": "http/1.1 400 Bad Request.\n{\n\t\"message\":\"Parameter \\\"data\\\" require\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/common.js",
    "groupTitle": "Common"
  },
  {
    "type": "get",
    "url": "/master/group/list",
    "title": "Get Group Member List.",
    "name": "GetGroupMembers",
    "group": "Master",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "master",
            "description": "<p>group master it self</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "member",
            "description": "<p>group member address and config value list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "http/1.1 200 ok\n[\t\n\t\"master\":\"192.168.1.6\",\n\t\"members\":[\n\t{\"address\":\"192.168.1.3\", \"config\":\"{\\\"nickname\\\":\\\"batu\\\", \\\"discript\\\":\\\"yes jam.\\\" ,\\\"batu\\\":true }\"\n\t, \"createdAt\":\"2017-11-09T06:54:32.318Z\",\"updatedAt\":\"2017-11-09T06:54:32.318Z\"}, { ... }\n\t]\n\t\t\t\t\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>reason of error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-response:",
          "content": "http/1.1 401 Error Unauthorized.\n{\n\t\"message\":\"Host type is not master\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/master.js",
    "groupTitle": "Master"
  },
  {
    "type": "post",
    "url": "/master/group/join",
    "title": "POST join the batu group.",
    "name": "JoinGroup",
    "group": "Master",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>just set &quot;ok&quot;.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "http/1.1 200 ok\n{\n\t\"message\":\"ok\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>reason of error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-response:",
          "content": "http/1.1 401 Error Unauthorized.\n{\n\t\"message\":\"Host type is not master\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/master.js",
    "groupTitle": "Master"
  },
  {
    "type": "post",
    "url": "/master/config/update",
    "title": "POST update member config update.",
    "name": "UpdateGroupMemberConfig",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "config",
            "description": "<p>a slave batu system config for update.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "config",
          "content": "{\n\t\"nickname\":\"batu\",\n\t\"discript\":\"yes jam.\",\n\t\"batu\":true \n}",
          "type": "json"
        }
      ]
    },
    "group": "Master",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>just set &quot;ok&quot;.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "http/1.1 200 ok\n{\n\t\"message\":\"ok\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>reason of error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-response:",
          "content": "http/1.1 401 Error Unauthorized.\n{\n\t\"message\":\"Host type is not master\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/master.js",
    "groupTitle": "Master"
  },
  {
    "type": "GET",
    "url": "/slave/group/my/master",
    "title": "GET Current Group Master Address.",
    "name": "GetMyMaster",
    "group": "Slave",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;ok&quot;.</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "address",
            "description": "<p>Master Batu Address</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-response:",
          "content": "http/1.1 200 ok\n{\n\t\"message\":\"ok\",\n\t\"address\":\"192.168.1.7\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "string",
            "optional": false,
            "field": "message",
            "description": "<p>reason of error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-response:",
          "content": "http/1.1 401 Error Unauthorized.\n{\n\t\"message\":\"Host type is not slave\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/slave.js",
    "groupTitle": "Slave"
  }
] });
