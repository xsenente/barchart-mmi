// Width and height
const margin = { top: 30, right: 20, bottom: 10, left: 400 },
      width  = 800,
      height = 600,
      heightModule = height / 20,
      duration = 1000;

/** -----------------------------------
  * Création du SVG
  * ----------------------------------- */

const svg = d3.select( ".barchart" )
  .append( "svg" )
    .attr( "viewBox", `0 0 ${ width } ${ height }` )
  .append( "g" )
    .attr( "transform", `translate( ${ margin.left }, ${ margin.top } )` );

/** -----------------------------------
  * Création de l'échelle des abscisses
  * ----------------------------------- */

const xScale = d3.scaleLinear()
  .domain( [ 0, 50 ] )
  .range( [ 0, width - margin.left - margin.right ] );

const xAxis = d3.axisTop().scale(xScale);

svg.append( "g" )
  .attr( "class", "x axis" )
  .call( xAxis)

/** -----------------------------------
  * Création de l'échelle des ordonnées
  * ----------------------------------- */

const yScale = d3.scaleBand()
  .padding(0.2);

const yAxis = d3.axisLeft()
  .scale( yScale )
  .tickSizeOuter(0)

svg.append( "g" )
  .attr( "class", "y axis" )

/** -----------------------------------
  * Fonction qui redessine le graphique à chaque changement de données
  * -----------------------------------
  */

function update( data ) {

  yScale.domain( data.map( d => d.module ) )
    .range( [ 0, data.length * ( heightModule ) ] );

  const textInterpol = function ( d ) {
    const i = d3.interpolate( this.textContent, d.heures);
    return t => this.textContent = Math.round( i( t ) );
  };

  /**
    * Voyez la constante newRow comme un conteneur des nouvelles données entrantes.
    * Cela permettra de faire des transitions entre les données existantes, entrantes et sortantes.
    */
  const newRow = svg.selectAll( "g.module" )
    .data( data );

  const row = newRow.enter()
    .append( "g" )
    .attr( "class", "module" )
    .attr( "transform", d => `translate( 0, ${ yScale( d.module ) } )` );

  row.insert( "rect" )
    .attr( "class", "module_bar" )
    .attr( "x", 0 )
    .attr( "opacity", 1 )
    .attr( "height", yScale.bandwidth() )
    .attr( "width", 0 )
      .transition().duration( duration )
        .attr("width", d => xScale( d.heures ) )

  row.append( "text" )
    .attr( "class", "module_hours" )
    .attr( "y", yScale.bandwidth()/2 )
    .attr( "dy", ".35em" )
    .attr( "dx", "0.5em" )
    .attr( "x", 0 )
    .attr( "opacity", 1 )
    .text( 0 )
    .transition().duration( duration )
      .attr( "x", d => xScale( d.heures ) )
      .tween( "text", textInterpol );

  svg.select( ".y.axis" )
    .call( yAxis.tickFormat( d => "M." + d ) )
    .selectAll( ".tick" )
      .style( "opacity", 0 )
      .append( "text" )
        .attr( "fill", "currentColor" )
        .attr( "dx", "-7rem" )
        .attr( "dy", ".35rem" )
        .data( data )
          .text( d => d.name )

  /**
    * Mise à jour du graphique à partir des nouvelles données entrantes
    */

  newRow.select( ".module_bar" )
    .transition().duration( duration )
      .attr( "width", d => xScale( d.heures ) )

  newRow.select( ".module_hours" )
    .transition().duration( duration )
      .attr( "x", d => xScale( d.heures ) )
      .tween( "text" , textInterpol );

  svg.select( ".y.axis" ).selectAll( ".tick" )
    .transition().duration( duration / 2 )
      .style( "opacity", 1 );

  /**
    * Suppression des données sortantes
    */

  newRow.exit()
    .select( ".module_bar" )
      .transition().duration( duration )
        .attr( "opacity", 0 )
        .attr( "width", 0 )

  newRow.exit()
    .select( ".module_hours" )
      .transition().duration( duration )
        .attr( "opacity", 0 )
        .attr( "x", 0 );

  newRow.exit()
    .transition().duration( duration )
      .remove();

};

/** -----------------------------------
  * Fonction qui permet de changer de semestre
  * -----------------------------------
  */
function changeSemestre() {
  const semestreSelect = this.value;
  const semestre = (datafile) => ({
    "semestre-1": "data/heures-mmi-s1.tsv",
    "semestre-2": "data/heures-mmi-s2.tsv",
    "semestre-3": "data/heures-mmi-s3.tsv",
    "semestre-4": "data/heures-mmi-s4.tsv"
  })[datafile]

  d3.tsv( semestre( semestreSelect ) ).then( data => update( data ) );
};

d3.tsv("data/heures-mmi-s1.tsv").then( data => update( data ) );

d3.select( "select" ).on( "change", changeSemestre );
