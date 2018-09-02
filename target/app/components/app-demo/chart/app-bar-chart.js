var ngCore = require('@angular/core');

/**
 * AppBarChart - responsible for rendering d3js bar chart which displaying repositories' stargazers count value
 *    @Input() 'repositories' - data for visualization
 *    @Input() 'searchText'
 */
function AppBarChart() {

    this.drawLineChart = function (repositories) {

        var data = [];

        repositories.forEach(function (repository) {
            var itemForChart = {
                name: repository.name,
                stargazers: repository.stargazers_count
            };

            data.push(itemForChart);

        });

        var containerWidth = document.getElementById('svg-card-container').clientWidth;

        // set the dimensions and margins of the graph
        var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 80
        };

        var width = containerWidth - margin.left - margin.right;
        var height = 650 - margin.top - margin.bottom;

        var x = d3
            .scaleBand()
            .range([0, width])
            .padding(0.1);

        var y = d3
            .scaleLinear()
            .range([height, 0]);


        d3.select('svg')
            .selectAll("*")
            .remove();

        var svg = d3.select(document.getElementsByTagName("svg")[0]);

        var barGroup = svg.attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("class", "bar-group")
            .attr("transform",
                "translate(" + margin.left + "," + 0 + ")");

        x.domain(data.map(function(d) { return d.name; }));
        y.domain([0, d3.max(data, function(d) { return d.stargazers; })]);


        // append the rectangles for the bar chart
        barGroup.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.name); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.stargazers); })
            .attr("height", function(d) { return height - y(d.stargazers); });

        // add the x Axis
        var axisX = svg.append("g")
            .attr("transform",
                "translate(" + margin.left + "," + height + ")")
            .call(d3.axisBottom(x));

        // rotate axix x labels
        axisX.selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(45)")
            .style("text-anchor", "start");

        // add the y Axis
        svg.append("g")
            .attr("transform",
                "translate(" + margin.left + "," + 0 + ")")
            .call(d3.axisLeft(y));

        // make some height correction because of transformed axisX labels
        svg.attr("height", Number(svg.attr("height")) + 50);

    };


};

AppBarChart.prototype = {
    constructor: AppBarChart,

    ngAfterViewChecked: function () {

    },

    ngOnChanges: function (changes) {

        if(changes && changes.repositories && changes.repositories.currentValue){
            this.drawLineChart(changes.repositories.currentValue)
        }

    }
    
};

AppBarChart.annotations = [
    new ngCore.Component({
        selector: 'app-bar-chart',
        template: require('./app-bar-chart.html!text'),
        inputs: [
            'repositories',
            'searchText'
        ]
    })
];

module.exports = AppBarChart;
