var _ = require('lodash')



var graph = {}

vertex("a")
vertex("b")
vertex("c")
vertex("d")
vertex("e")
vertex("f")
vertex("g")
vertex("h")

bijoin("a", "b", 1)
bijoin("b", "c", 1)
bijoin("c", "d", 1)
bijoin("d", "e", 1)
bijoin("e", "f", 1)
bijoin("f", "g", 1)
bijoin("g", "h", 1)
bijoin("h", "a", 1)

function vertex(id) {
    graph[id] = {id:id, connections:{}}
}

function bijoin(pointA, pointB, distance) {
    join(pointA, pointB, distance)
    join(pointB, pointA, distance)
}

function join(fromId, toId, distance) {
    graph[fromId].connections[toId] = {id:toId, distance: distance}
}


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

    return previous

}

function formatPath(visiteds, finalPointId, firstPointId) {

}

console.log(shortestPath(graph, "a", "h"))


//  1  function Dijkstra(Graph, source):
//  2      dist[source]  := 0                     // Distance from source to source
//  3      for each vertex v in Graph:            // Initializations
//  4          if v ≠ source
//  5              dist[v]  := infinity           // Unknown distance function from source to v
//  6              previous[v]  := undefined      // Previous node in optimal path from source
//  7          end if 
//  8          add v to Q                         // All nodes initially in Q (unvisited nodes)
//  9      end for
// 10      
// 11      while Q is not empty:                  // The main loop
// 12          u := vertex in Q with min dist[u]  // Source node in first case
// 13          remove u from Q 
// 14          
// 15          for each neighbor v of u:           // where v has not yet been removed from Q.
// 16              alt := dist[u] + length(u, v)
// 17              if alt < dist[v]:               // A shorter path to v has been found
// 18                  dist[v]  := alt 
// 19                  previous[v]  := u 
// 20              end if
// 21          end for
// 22      end while
// 23      return dist[], previous[]
// 24  end function

