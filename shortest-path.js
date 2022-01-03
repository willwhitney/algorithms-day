class City {
    constructor(name) {
        this.name = name
        this.neighbors = []
        this.neighbor_dists = []
        this.parents = []
        this.parent_dists = []
        this.parent_dict = []
        this.visitMiami = null
    }

    add_neighbor(neighbor, neighbor_dist) {
        this.neighbors.push(neighbor)
        this.neighbor_dists.push(neighbor_dist)

        neighbor.add_parent(this, neighbor_dist)
    }

    add_parent(parent, parent_dist) {
        this.parents.push(parent)
        this.parent_dists.push(parent_dist)
        this.parent_dict.push({
            parent: parent,
            dist: parent_dist
        });
    }
}

world = {}

world['boston'] = new City('boston', [], []),
world['peekskill'] = new City('peekskill', [], []),
world['new_york'] = new City('new_york', [], []),
world['washington'] = new City('washington', [], []),
world['roanoke'] = new City('roanoke', [], []),
world['charlotte'] = new City('charlotte', [], []),
world['atlanta'] = new City('atlanta', [], []),
world['jacksonville'] = new City('jacksonville', [], []),
world['miami'] = new City('miami', [], []),

world['boston'].add_neighbor(world['peekskill'], 5)
world['boston'].add_neighbor(world['new_york'], 7)

world['peekskill'].add_neighbor(world['new_york'], 2)
world['peekskill'].add_neighbor(world['washington'], 9)
world['peekskill'].add_neighbor(world['roanoke'], 18)

world['new_york'].add_neighbor(world['washington'], 8)

world['washington'].add_neighbor(world['charlotte'], 12)
world['washington'].add_neighbor(world['jacksonville'], 21)

world['roanoke'].add_neighbor(world['atlanta'], 8)
world['roanoke'].add_neighbor(world['charlotte'], 8)

world['charlotte'].add_neighbor(world['jacksonville'], 8)
world['charlotte'].add_neighbor(world['atlanta'], 7)

world['atlanta'].add_neighbor(world['jacksonville'], 7)
world['atlanta'].add_neighbor(world['miami'], 18)

world['jacksonville'].add_neighbor(world['miami'], 10)


function shortestDist(city) {
    // Establish an order of cities to go through, shortest distance order of parents
    // Find the shortest distance of that city based on all paths to date
    // Move on to the next shortest city
    let visitQueue = [];
    visitQueue.push(world["miami"]);

    while (visitQueue.length > 0) {
        let current = visitQueue.shift();
        console.log("Current city: ", current.name);
        current && current.parent_dict.sort((a, b) => a.dist - b.dist); // sort parents by shortest
        let sortedParents = current.parent_dict.map((each) => each.parent);
        visitDist(current);
        visitQueue = visitQueue.concat(sortedParents);
    }

    return world;

    function visitDist(city) {
        if (city.name === "miami") city.visitMiami = 0;

        for (let i = 0; i < city.parent_dict.length; i++) {
            let dist = city.parent_dict[i].dist;
            let visitLength = city.parent_dict[i].parent.visitMiami;
            if (visitLength == null) {
                console.log("New visit, parent: ", city.parent_dict[i].parent.name, visitLength);
                // Check whether this visit is greater than or equal to that
                visitLength = dist + city.visitMiami;
            }
            if (visitLength > 0 && (city.visitMiami + city.parent_dict[i].dist < visitLength)) {
                visitLength = city.visitMiami + city.parent_dict[i].dist
            }
            city.parent_dict[i].parent.visitMiami = visitLength;
        }
    }
}

console.log(shortestDist(world["charlotte"]));