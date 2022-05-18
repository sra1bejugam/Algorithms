function FlyWeight(project, user) {
    this.project = project;
    this.user = user;
}

function getFly() {
    let fly = {}
    let get = function (project, user) {
        if (!fly[project + user]) {
            fly[project + user] = new FlyWeight(project, user);
        }
        return fly[project + user];
    }
    return {
        get:get
    }
}
let r = getFly.get('red', 'sr2')
r
