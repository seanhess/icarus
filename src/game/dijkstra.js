var _ = require('lodash')
var immstruct = require('immstruct')
var Immutable = require('immutable')

function pathToRoom(roomsMap, fromRoom, toRoom) {
    var rooms = roomsGraph(roomsMap)
    return shortestPath(rooms, fromRoom, toRoom)
}

function nextRoomToDestination(roomsMap, fromRoom, toRoom) {
    var path = pathToRoom(roomsMap, fromRoom, toRoom)
    return (path.length > 1) ? path[path.length - 2] : path[0]
}

function roomsGraph(roomsMap) {
    var rooms = roomsMap.toJS()
    return _.mapValues(rooms, function(room) {
        var connections = _.mapValues(room.connections, function(connection){
            return {id:connection.id, distance:1 }
        })
        return {id:room.id, connections:connections}
    })
}


// var graph = {}

// vertex("a")
// vertex("b")
// vertex("c")
// vertex("d")
// vertex("e")
// vertex("f")
// vertex("g")
// vertex("h")

// bijoin("a", "b", 1)
// bijoin("b", "c", 1)
// bijoin("c", "d", 1)
// bijoin("d", "e", 1)
// bijoin("e", "f", 1)
// bijoin("f", "g", 1)
// bijoin("g", "h", 1)
// bijoin("h", "a", 1)

// function vertex(id) {
//     graph[id] = {id:id, connections:{}}
// }

// function bijoin(pointA, pointB, distance) {
//     join(pointA, pointB, distance)
//     join(pointB, pointA, distance)
// }

// function join(fromId, toId, distance) {
//     graph[fromId].connections[toId] = {id:toId, distance: distance}
// }


////////// Algorithm //////////

function shortestPath(_graph, pointAId, pointBId) {
    var graph = _.cloneDeep(_graph)
    var distance = _.mapValues(_graph, function(){return 100000})
    distance[pointAId] = 0
    var previous = {}

    var unvisiteds = graph

    var keepLooping = true
    while (!_.isEmpty(unvisiteds)) {
        var current = _.min(unvisiteds, function(v){return distance[v.id]})
        delete unvisiteds[current.id]

        _.forIn(current.connections, function(connection) {
            var altDist = distance[current.id] + connection.distance
            if (altDist < distance[connection.id]) {
                distance[connection.id] = altDist
                previous[connection.id] = current.id
            }
        })
        if (current.id == pointBId) break;
    }

    return formatPath(previous, pointAId, pointBId)

}

function formatPath(visiteds, finalPointId, firstPointId) {
    var path = [firstPointId]
    var last
    while (true) {
        last = _.last(path)
        if (last == finalPointId) break
        else path.push(visiteds[last])
    }
    return path
}

module.exports = {
    pathToRoom: pathToRoom,
    nextRoomToDestination: nextRoomToDestination,
}
