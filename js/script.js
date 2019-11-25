const margin = { top: 30, right: 20, bottom: 10, left: 400 };
const width  = 800;
const height = 600;
const moduleHeight = 20;

const svg = d3.select( ".barchart" )
  .append( "svg" )
    .attr( "viewBox", `0 0 ${ width } ${ height }` )
  .append( "g" )
    .attr( "transform", `translate( ${ margin.left }, ${ margin.top } )` );

d3.tsv( "data/heures-mmi-s1.tsv" ).then( function( data ) {
  const row = svg.selectAll( "g.module" )
    .data( data )
    .enter()
      .append( "g" )
      .attr( "class", "module" )
      .attr( "transform", ( d, i ) => `translate(0, ${ i * ( moduleHeight + 2 ) } )` );

  row.append( "rect" )
    .attr( "class", "module_bar" )
    .attr( "x", 0 )
    .attr( "height", moduleHeight )
    .attr( "width", d => d.heures )

})
