
renderCharts = () => {
    let sel = d3.select('select').property('value');
    let panel = document.querySelector('.panel-body');

    d3.json('./data/samples.json').then(({ metadata, samples }) => {

        let meta = metadata.filter(obj => obj.id == sel)[0];
        let sample = samples.filter(obj => obj.id == sel)[0];
        const { otu_ids, sample_values, otu_labels } = sample;
console.log( otu_ids, sample_values, otu_labels)
        panel.innerHTML = '';
        Object.entries(meta).forEach(arr => panel.innerHTML += `<h5>${arr[0]}: ${arr[1]}</h5>`);

        var data = [
            {
                x: sample_values.slice(0, 10).reverse(),
                y: otu_ids.slice(0, 10).reverse().map(x=>`OTU ${x}`),
                text: otu_labels.slice(10).reverse(),
                type: 'bar',
                orientation: 'h'
            }
        ];
        console.log(sample_values);



        console.log(data[0].x);
        Plotly.newPlot('bar', data);


        var trace1 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
              color: otu_ids,
              opacity: [1, 0.8, 0.6, 0.4],
              size: sample_values
            }
          };
          
          var data = [trace1];
          
          var layout = {
            xaxis:{title: 'OTU ID'},
            showlegend: false
            
          };
          
          Plotly.newPlot('bubble', data, layout);
    })
};

d3.json('./data/samples.json').then(data => {
    x = data;

    data.names.forEach(name => d3.select('select').append('option').text(name));
    renderCharts()
});

optionChanged = () => {
    renderCharts();
};

