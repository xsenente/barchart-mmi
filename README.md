# barchart MMI — Transitions et animations
Barchart MMI avec D3js

Une transition est une interface de type sélection permettant d’animer les modifications apportées au DOM.

Au lieu d'appliquer les modifications instantanément, les transitions interpolent en douceur le DOM de son état actuel à l'état cible souhaité, sur une durée donnée.

```javascript
  newRow.select( ".module_bar" )
    .attr( "width", d => xScale( d.heures ) )

  newRow.select( ".module_hours" )
    .attr( "x", d => xScale( d.heures ) )
    .text( d => d.heures );
```

### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&downarrow;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&downarrow;

```javascript
  newRow.select( ".module_bar" )
    .transition().duration( 2000 )
      .attr( "width", d => xScale( d.heures ) )

  newRow.select( ".module_hours" )
    .transition().duration( 2000 )
      .attr( "x", d => xScale( d.heures ) );
```

## Interpolateurs

Pour calculer l'état intermédiaire, les transitions utilisent une **variété d'interpolateurs intégrés**. Les couleurs, les nombres et les transformations sont automatiquement détectés. Les chaînes avec des nombres incorporés sont également détectées, comme cela est courant dans de nombreux styles (tels que le remplissage ou la taille des polices) et les chemins.

Pour spécifier un interpolateur personnalisé, utilisez transition.attrTween, transition.styleTween ou transition.tween.

```javascript
  const textInterpol = function ( d ) {
    const i = d3.interpolate( this.textContent, d.heures);
    return t => this.textContent = Math.round( i( t ) );
  };
```

```javascript
  newRow.select( ".module_hours" )
    .transition().duration( duration )
      .tween( "text" , textInterpol );
```

## Transitions sur les éléments entrants

```javascript
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
```

## Transitions sur les éléments sortant

```javascript
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
```
