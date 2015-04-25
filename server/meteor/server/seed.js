if (Units.find().count() === 0) {

    var documents = JSON.parse(Assets.getText('pokemon.json'))['root'];

    _.each( documents, function( doc ){
      // turn string values to integers
      _.each(doc, function(value,key){
        if (key!=="name") {
          doc[key] = parseInt(value);
        }
      })
      Units.insert(doc);
    })

  }