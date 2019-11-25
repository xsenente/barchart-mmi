const margin = { top: 30, right: 20, bottom: 10, left: 400 };
const width  = 800;
const height = 600;
const moduleHeight = 20;

const svg = d3.select( ".barchart" )
  .append( "svg" )
    .attr( "viewBox", `0 0 ${ width } ${ height }` )
  .append( "g" )
    .attr( "transform", `translate( ${ margin.left }, ${ margin.top } )` );

const xScale = d3.scaleLinear()
  .domain( [ 0, 50 ] )
  .range( [0, width - margin.left - margin.right ] );

const xAxis = d3.axisTop()
  .scale(xScale);

svg.append( "g" )
  .attr( "class", "x axis" )
  .call( xAxis )

const yScale = d3.scaleBand()
  .range( [ 0, height - margin.top - margin.bottom ] )
  .padding(0.2)

const yAxis = d3.axisLeft()
  .scale( yScale )
  .tickSizeOuter(0)

svg.append( "g" )
  .attr( "class", "y axis")

d3.tsv( "data/heures-mmi-s1.tsv" ).then( function( data ) {

  yScale.domain(data.map( d => d.module ) );

  const row = svg.selectAll( "g.module" )
    .data( data )
    .enter()
      .append( "g" )
      .attr( "class", "module" )
      .attr( "transform", d => "translate(0," + yScale( d.module ) + ")" );

  row.append( "rect" )
    .attr( "class", "module_bar" )
    .attr( "x", 0 )
    .attr( "height", yScale.bandwidth() )
    .attr( "width", d => xScale(d.heures) )

  row.append( "text" )
    .attr( "class", "module_hours" )
    .attr( "y", yScale.bandwidth() / 2 )
    .attr( "x", d => xScale( d.heures ) )
    .attr( "dy", ".35em" )
    .attr( "dx", "0.5em" )
    .text( d => d.heures );

  svg.select( ".y.axis" )
    .call( yAxis.tickFormat( d => "M." + d ) )
    .selectAll( ".tick" )
      .append( "text" )
        .attr( "fill", "currentColor" )
        .attr( "dx", "-7rem" )
        .attr( "dy", ".35rem" )
      .data( data )
        .text( d => d.name );

})
