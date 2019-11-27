# barchart MMI — Changement des données
Barchart MMI avec D3js

## Ajout de la liste des semestres

Dnas le HTML, nous ajoutons un select avec la liste des semestres.

```html
<div class="controls">
  <div class="select">
    <select id="myselect">
      <option value="semestre-1" selected="selected">Semestre 1</option>
      <option value="semestre-2">Semestre 2</option>
      <option value="semestre-3">Semestre 3</option>
      <option value="semestre-4">Semestre 4</option>
    </select>
  </div>
</div>
```

## Fonction changeSemeste()

On définit une fonction qui permet d'écouter le changement de semestre du select et de l'associer à l'URL du fichier de données correspondant.

```javascript
function changeSemestre() {
  const semestreSelect = this.value;
  const semestre = (datafile) => ({
    "semestre-1": "data/heures-mmi-s1.tsv",
    "semestre-2": "data/heures-mmi-s2.tsv",
    "semestre-3": "data/heures-mmi-s3.tsv",
    "semestre-4": "data/heures-mmi-s4.tsv"
  })[datafile]
  // console.log(semestre( semestreSelect ));
};
```

On transforme la fonction chargeant les données :

Avant |  | Après
------------ | ------------- | -------------
```javascript
  function changeSemestre() {};
``` 
| => |
```javascript
  function changeSemestre() {};
```
