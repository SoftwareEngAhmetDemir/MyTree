
var svg = d3.select('body')
.append('svg').attr('width',600)
.attr('height',600)
.append('g')
.attr('transform','translate(50,50)');

var data = [
  
    {'child':'john','parent' :''  },
    {'child':'Aaron','parent' :'kevin'  },
    {'child':'kevin','parent' :'john'  },
    {'child':'Hannah','parent' :'Ann'  },
    {'child':'Rose','parent' :'Sarah'  },
    {'child':'Rose','parent' :'Sarah'  },
    {'child':'Ann','parent' :'john'  },
    {'child':'Sarah','parent' :'kevin'  },
    {'child':'Mark','parent' :'Ann'  },
    {'child':'Mark','parent' :'Ann'  },

];



var dataStructure = d3.stratify()
                    .id(function(d){
return d.child;
                    }).parentId(function(d){
                        return d.parent;
                    })(data);


    var treeStructure = d3.tree().size([500,300]);
    var information = treeStructure(dataStructure);

    console.log(information.descendants()); // node elements 9 
    console.log(information.links()) // 8 connections

    var circles = svg.append('g').selectAll('circle')
    .data(information.descendants());
    circles.enter().append('circle')
    .attr('cx',function(d){
        return d.x;
    }) .attr('cy',function(d){
        return d.y;
    }).attr('r',5);



    var connections = svg.append('g')
    .selectAll('path')
    .data(information.links());

    connections.enter().append('path')
    .attr('d',function(d){
        console.log('source '+ (d.source.x+','+d.source.y))
        console.log('target '+ (d.target.x+','+d.target.y))

// let t =
//         console.log('line')
//       console.log("M"+ d.source.x+','+d.source.y+"C "+
//       d.source.x+','+(d.source.y+d.target.y)/2+" "
//       +d.target.x+','+(d.source.y+d.target.y)/2+" "
//       +d.target.x+","+d.target.y+" ")
        return "M"+ d.source.x+','+d.source.y+"L "+
        d.source.x+','+(d.source.y+d.target.y)/2+" "
        +d.target.x+','+(d.source.y+d.target.y)/2+" "
        +d.target.x+","+d.target.y+" ";
    })

    var names = svg.append('g')
    .selectAll('text')
    .data(information.descendants());

    names.enter().append('text')
    .text(function(d){
        return d.data.child;
    }).attr('x',function(d){
        return d.x+5;
    })
    .attr('y',function(d){
        return d.y+2;
    })

