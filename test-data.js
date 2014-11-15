var random_number = function(minimum, maximum){
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
}

var randomQueueData = function(){
    return {
        "current_queue_activity": {
            "calls_waiting": random_number(0, 10),
            "average_wait_time": random_number(0,430),
            "longest_wait_time": random_number(0,430)
        }
    }
}

var randomAgentStatus = function(){
    var key = random_number(0,3);
    var codes = ["not_available", "available", "wrap_up", "on_call"];
    return codes[key];
}

var randomAgentActivity = function(){
    return {
        "agents_activity": [
            {
                "agent_id": 795042943,
                "name": "Alexis Kind",
                "status": "Not Available",
                "status_code": randomAgentStatus(),
                "via": "client",
                "available_time": 6846,
                "calls_accepted": 56,
                "calls_denied": 2,
                "calls_missed": 0,
                "average_talk_time": 186,
                "forwarding_number": null
            },
            {
                "agent_id": 856844443,
                "name": "Casandra Reasoner",
                "status": "Not Available",
                "status_code": randomAgentStatus(),
                "via": "client",
                "available_time": 0,
                "calls_accepted": 0,
                "calls_denied": 0,
                "calls_missed": 0,
                "average_talk_time": 0,
                "forwarding_number": null
            },
            {
                "agent_id": 840769596,
                "name": "Chante Alvin",
                "status": "Not Available",
                "status_code": randomAgentStatus(),
                "via": "client",
                "available_time": 2661,
                "calls_accepted": 66,
                "calls_denied": 0,
                "calls_missed": 0,
                "average_talk_time": 227,
                "forwarding_number": null
            },
            {
                "agent_id": 698657608,
                "name": "David Nunez",
                "status": "Not Available",
                "status_code": randomAgentStatus(),
                "via": "client",
                "available_time": 0,
                "calls_accepted": 0,
                "calls_denied": 0,
                "calls_missed": 0,
                "average_talk_time": 0,
                "forwarding_number": null
            },
            {
                "agent_id": 840768686,
                "name": "Elizabeth Cortez",
                "status": "Not Available",
                "status_code": randomAgentStatus(),
                "via": "client",
                "available_time": 52357,
                "calls_accepted": 57,
                "calls_denied": 0,
                "calls_missed": 0,
                "average_talk_time": 266,
                "forwarding_number": null
            },
            {
                "agent_id": 826314433,
                "name": "Emily Carner",
                "status": "Not Available",
                "status_code": randomAgentStatus(),
                "via": "client",
                "available_time": 12447,
                "calls_accepted": 21,
                "calls_denied": 0,
                "calls_missed": 0,
                "average_talk_time": 251,
                "forwarding_number": null
            },
            {
                "agent_id": 840763536,
                "name": "Eric Molina",
                "status": "Not Available",
                "status_code": randomAgentStatus(),
                "via": "client",
                "available_time": 3437,
                "calls_accepted": 60,
                "calls_denied": 0,
                "calls_missed": 0,
                "average_talk_time": 175,
                "forwarding_number": null
            },
            {
                "agent_id": 840767756,
                "name": "Felicia Lechuga",
                "status": "Not Available",
                "status_code": randomAgentStatus(),
                "via": "client",
                "available_time": 2751,
                "calls_accepted": 27,
                "calls_denied": 1,
                "calls_missed": 0,
                "average_talk_time": 325,
                "forwarding_number": null
            },
            {
                "agent_id": 705200326,
                "name": "Jason Awbrey",
                "status": "Not Available",
                "status_code": randomAgentStatus(),
                "via": "client",
                "available_time": 0,
                "calls_accepted": 0,
                "calls_denied": 0,
                "calls_missed": 0,
                "average_talk_time": 0,
                "forwarding_number": "+15039399407"
            },
            {
                "agent_id": 826922466,
                "name": "Jessica Dobbs",
                "status": "Not Available",
                "status_code": randomAgentStatus(),
                "via": "client",
                "available_time": 123,
                "calls_accepted": 10,
                "calls_denied": 0,
                "calls_missed": 0,
                "average_talk_time": 125,
                "forwarding_number": null
            },
            {
                "agent_id": 840766776,
                "name": "Kim Sproul",
                "status": "Not Available",
                "status_code": randomAgentStatus(),
                "via": "client",
                "available_time": 16405,
                "calls_accepted": 38,
                "calls_denied": 0,
                "calls_missed": 0,
                "average_talk_time": 355,
                "forwarding_number": null
            },
            {
                "agent_id": 840770396,
                "name": "Kristie Snyder",
                "status": "Not Available",
                "status_code": randomAgentStatus(),
                "via": "client",
                "available_time": 6206,
                "calls_accepted": 43,
                "calls_denied": 1,
                "calls_missed": 1,
                "average_talk_time": 291,
                "forwarding_number": null
            }
        ],
        "next_page": null,
        "previous_page": null,
        "count": 12
    }
}
var userList = {users:[{id:795042943}, {id:826314433}, {id:826922466}, {id:840763536}, {id:840766776}, {id:840767756}, {id:840768686}, {id:840769596}, {id:840770396}, {id:856844443}]}
module.exports.randomQueueData     = randomQueueData;
module.exports.randomAgentActivity = randomAgentActivity;
module.exports.userList            = userList;
